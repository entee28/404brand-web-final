import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "types";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail";

declare module "express-session" {
  export interface SessionData {
    userId: number;
  }
}

@InputType()
class RegisterInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class ChangePasswordResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean)
  success: boolean;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (!input.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email",
          },
        ],
      };
    }

    if (input.password.length < 6) {
      return {
        errors: [
          {
            field: "password",
            message: "Password too short",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(input.password);
    let user;

    try {
      user = await User.create({
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        password: hashedPassword,
      }).save();

      req.session.userId = user?.id;
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "email already taken",
            },
          ],
        };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: input.email } });

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email",
          },
        ],
      };
    }

    const password = await argon2.verify(user.password, input.password);
    if (!password) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne({ where: { id: req.session.userId } });
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }

  @Mutation(() => Boolean)
  async forgetPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = uuidv4();

    await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, "EX", 60 * 10);

    const resetUrl = `http://localhost:3000/passwordreset/${token}`;

    const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: message,
    });

    return true;
  }

  @Mutation(() => UserResponse)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length < 6) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Password must have at least 6 characters",
          },
        ],
      };
    }

    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token is expired",
          },
        ],
      };
    }

    const user = await User.findOne({ where: { id: parseInt(userId) } });
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "Invalid token",
          },
        ],
      };
    }

    const password = await argon2.hash(newPassword);

    await User.update({ id: user.id }, { password });

    await redis.del(FORGET_PASSWORD_PREFIX + token);

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => ChangePasswordResponse)
  async changePassword(
    @Arg("password") password: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<ChangePasswordResponse> {
    if (newPassword.length < 6) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "New Password must have at least 6 characters",
          },
        ],
        success: false,
      };
    }
    if (password.length < 6) {
      return {
        errors: [
          {
            field: "password",
            message: "Password must have at least 6 characters",
          },
        ],
        success: false,
      };
    }

    const userId = req.session.userId;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User not exists",
          },
        ],
        success: false,
      };
    }

    const verified = await argon2.verify(user.password, password);

    if (!verified) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
        success: false,
      };
    }

    await User.update(
      { id: user.id },
      { password: await argon2.hash(newPassword) }
    );

    return { success: true };
  }
}
