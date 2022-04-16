import { User } from "entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { MyContext } from "types";
import argon2 from "argon2";

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
    const user = await User.create({
      firstname: input.firstname,
      lastname: input.lastname,
      email: input.email,
      password: hashedPassword,
    });

    req.session.userId = user.id;

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
}
