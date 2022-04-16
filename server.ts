import { ApolloServer } from "apollo-server-express";
import { Product } from "./entities/Product";
import express from "express";
import { ProductResolver } from "./resolvers/product";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import cors from "cors";
import { User } from "./entities/User";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import { COOKIE_NAME } from "./constants";
import { __prod__ } from "./constants";
import { Request, Response } from "express";
import { MyContext } from "types";

export const myDataSource = new DataSource({
  type: "postgres",
  database: "brand404",
  username: "postgres",
  password: "200182",
  logging: true,
  synchronize: true,
  entities: [Product, User],
});

const main = async () => {
  await myDataSource.initialize();

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        secure: __prod__,
        sameSite: false,
        httpOnly: true,
      },
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
};

main().catch((err) => {
  console.error(err);
});
