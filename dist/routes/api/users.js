"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const express_1 = __importDefault(require("express"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const verifyToken_1 = require("../../middleware/verifyToken");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const router = express_1.default.Router();
router.put("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => {
    if (req.body.password) {
        req.body.password = crypto_js_1.default.AES.encrypt(req.body.password, process.env.PASS_SEC.toString());
    }
    User_1.default.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true })
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
});
router.delete("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => {
    User_1.default.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ msg: "User has been deleted..." }))
        .catch((err) => res.status(500).json(err));
});
router.get("/find/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => {
    User_1.default.findById(req.params.id)
        .then((user) => {
        const _a = user === null || user === void 0 ? void 0 : user._doc, { password } = _a, others = __rest(_a, ["password"]);
        res.status(200).json(others);
    })
        .catch((err) => res.status(500).json(err));
});
router.get("/", verifyToken_1.verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User_1.default.find().sort({ _id: -1 }).limit(5)
            : await User_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get("/stats", verifyToken_1.verifyTokenAndAdmin, (_, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    User_1.default.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ])
        .sort({ _id: 1 })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
});
router.post("/", verifyToken_1.verifyTokenAndAdmin, (req, res, next) => {
    const newUser = new User_1.default({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        isAdmin: req.body.isAdmin,
    });
    newUser
        .save()
        .then((user) => res.status(201).json(user))
        .catch((err) => next(err));
});
exports.default = router;
//# sourceMappingURL=users.js.map