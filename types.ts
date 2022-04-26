import { Redis } from "ioredis";
import { Request, Response } from "express";
import { createProductLoader } from "./utils/createProductLoader";

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
  productLoader: ReturnType<typeof createProductLoader>;
};
