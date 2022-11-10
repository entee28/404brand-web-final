import User from "../../models/User";
import ErrorResponse from "../../utils/errorResponse";
import sendEmail from "../../utils/sendEmail";
import crypto from "crypto";
import { verifyToken } from "../../middleware/verifyToken";
import { Request, Response, Router } from "express";

const router = Router();

// @route POST api/auth/register
// @desc Register User
// @access Public
router.post("/register", (req: Request, res: Response, next: any) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  newUser
    .save()
    .then((user) =>
      res.status(201).json({
        success: true,
        token: user.getSignedToken(),
      })
    )
    .catch((err) => next(err));
});

// @route POST api/auth/Login
// @desc Login
// @access Public
router.post("/login", async (req: Request, res: Response, next: any) => {
  if (!req.body.email || !req.body.password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  User.findOne({ email: req.body.email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse("Wrong Credentials", 401));
      }

      user.matchPassword(req.body.password).then((isMatch) => {
        if (!isMatch) {
          return next(new ErrorResponse("Wrong Credentials", 401));
        }

        return res.status(200).json({
          success: true,
          token: user.getSignedToken(),
        });
      });
    })
    .catch((err) => next(err));
});

const forgotPassword = async (req: Request, res: Response, next: any) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorResponse("Email could not be sent", 404));

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse(error, 500));
    }
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req: Request, res: Response, next: any) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 401));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, data: "Password Reset Success" });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req: Request, res: Response, next: any) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return next(new ErrorResponse("Unauthorized request!", 401));
    }

    user.password = req.body.password;

    await user.save();

    res
      .status(200)
      .json({ success: true, data: "Password Changed Successfully" });
  } catch (err) {
    next(err);
  }
};

// @route POST api/auth/forgotpassword
// @desc Forget Password
// @access Public
router.route("/forgotpassword").post(forgotPassword);

// @route PUT api/auth/passwordreset
// @desc Reset Password
// @access Public
router.route("/passwordreset/:resetToken").put(resetPassword);

// @route PUT api/auth/changepassword
// @desc Change Password
// @access Private
router.put(
  "/changepassword",
  verifyToken,
  (req: Request, res: Response, next: any) => {
    User.findById(req.user.id)
      .then((user) => {
        if (!user) return next(new ErrorResponse("Unauthorized request!", 401));

        user.password = req.body.password;
        user
          .save()
          .then(() =>
            res
              .status(200)
              .json({ success: true, data: "Password Changed Successfully" })
          );
      })
      .catch((err) => next(err));
  }
);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", verifyToken, (req: Request, res: Response) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

export default router;
