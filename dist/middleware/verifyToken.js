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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAdminSeller = exports.verifyTokenAndSeller = exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const verifyToken = (req, _, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err)
                return next(new errorResponse_1.default("Token is not valid!", 404));
            req.user = user;
            next();
        });
    }
    else {
        return next(new errorResponse_1.default("Not authorized to access this route", 401));
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json({ msg: "Unauthorized access!" });
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
const verifyTokenAndAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json({ msg: "Unauthorized access!" });
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
const verifyTokenAndSeller = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.type === "Seller") {
            next();
        }
        else {
            res.status(403).json({ msg: "Unauthorized access!" });
        }
    });
};
exports.verifyTokenAndSeller = verifyTokenAndSeller;
const verifyTokenAdminSeller = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.type === "Seller" || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json({ msg: "Unauthorized access!" });
        }
    });
};
exports.verifyTokenAdminSeller = verifyTokenAdminSeller;
//# sourceMappingURL=verifyToken.js.map