import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  type: "Buyer" | "Seller";
  isAdmin: boolean;
}

interface IUserMethods {
  matchPassword(password: string): Promise<boolean>;
  getSignedToken(): string;
  getResetPasswordToken(): string;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    firstname: {
      type: String,
      required: [true, "Please provide first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please provide last name"],
    },
    //@ts-ignore
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email has already been existed"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    type: {
      type: String,
      required: [true, "Type can not be undefined"],
      enum: ["Buyer", "Seller"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  //@ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SEC,
    {}
  );
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);
export default User;
