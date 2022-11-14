import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse";
import * as dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req: Request, _: Response, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return next(new ErrorResponse("Token is not valid!", 404));
      req.user = user;
      next();
    });
  } else {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

export const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: any
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized access!" });
    }
  });
};

export const verifyTokenAndAdmin = (req: Request, res: Response, next: any) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized access!" });
    }
  });
};

export const verifyTokenAndSeller = (
  req: Request,
  res: Response,
  next: any
) => {
  verifyToken(req, res, () => {
    if (req.user.type === "Seller") {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized access!" });
    }
  });
};

export const verifyTokenAdminSeller = (
  req: Request,
  res: Response,
  next: any
) => {
  verifyToken(req, res, () => {
    if (req.user.type === "Seller" || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized access!" });
    }
  });
};
