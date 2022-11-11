"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const errorResponse_1 = __importDefault(require("../../utils/errorResponse"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
const verifyToken_1 = require("../../middleware/verifyToken");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", (req, res, next) => {
    const newUser = new User_1.default({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        type: req.body.type,
    });
    newUser
        .save()
        .then((user) => res.status(201).json({
        success: true,
        token: user.getSignedToken(),
    }))
        .catch((err) => next(err));
});
router.post("/login", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new errorResponse_1.default("Please provide an email and password", 400));
    }
    User_1.default.findOne({ email: req.body.email })
        .select("+password")
        .then((user) => {
        if (!user) {
            return next(new errorResponse_1.default("Wrong Credentials", 401));
        }
        user.matchPassword(req.body.password).then((isMatch) => {
            if (!isMatch) {
                return next(new errorResponse_1.default("Wrong Credentials", 401));
            }
            return res.status(200).json({
                success: true,
                token: user.getSignedToken(),
            });
        });
    })
        .catch((err) => next(err));
});
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return next(new errorResponse_1.default("Email could not be sent", 404));
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
        try {
            await (0, sendEmail_1.default)({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });
            res.status(200).json({ success: true, data: "Email Sent" });
        }
        catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new errorResponse_1.default(error, 500));
        }
    }
    catch (err) {
        next(err);
    }
};
const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    try {
        const user = await User_1.default.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!user) {
            return next(new errorResponse_1.default("Invalid Reset Token", 401));
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(200).json({ success: true, data: "Password Reset Success" });
    }
    catch (err) {
        next(err);
    }
};
router.route("/forgotpassword").post(forgotPassword);
router.route("/passwordreset/:resetToken").put(resetPassword);
router.put("/changepassword", verifyToken_1.verifyToken, (req, res, next) => {
    User_1.default.findById(req.user.id)
        .then((user) => {
        if (!user)
            return next(new errorResponse_1.default("Unauthorized request!", 401));
        user.password = req.body.password;
        user
            .save()
            .then(() => res
            .status(200)
            .json({ success: true, data: "Password Changed Successfully" }));
    })
        .catch((err) => next(err));
});
router.get("/user", verifyToken_1.verifyToken, (req, res) => {
    User_1.default.findById(req.user.id)
        .select("-password")
        .then((user) => res.json(user));
});
exports.default = router;
//# sourceMappingURL=auth.js.map