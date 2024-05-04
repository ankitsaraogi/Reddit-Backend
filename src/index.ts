import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";

import { COOKIE_NAME } from "./constants";
import microConfig from "./mikro-orm.config";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import RedisStore from "connect-redis";
import cors from "cors";
import session from "express-session";
// import { createClient } from "redis";
import Redis from "ioredis";

// import {createConnection} from "typeorm";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";

const main = async () => {
  const conn = new DataSource({
    type: "postgres",
    database: "lireddit2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true, // Do only in DEV
    entities: [Post, User],
  });
  await conn.initialize();

  // sendEmail(["bob@bob.com"], "Hello there");
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  // Initialize client.
  // let redisClient = createClient();
  // redisClient.connect().catch(console.error);
  let redis = new Redis();

  // Initialize store.
  let redisStore = new RedisStore({
    client: redis,
    disableTouch: true,
    // prefix: "myapp:",
  });

  /**
   * Also add this on headers in playground {"x-forwarded-proto": "https"}
   * & below settings is needed to set cookie on browser.
   */
  app.set("trust proxy", true);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  // Initialize session storage.
  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: true, // cookie only work in https
      },
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "keyboard cat",
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      em: orm.em,
      req,
      res,
      redis,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false, // this is needed to make sure express cors take into effect
  });
  app.listen(4000, () => {
    console.log("server started on localhost:4000!!");
  });
};

main().catch((err) => {
  console.error(err);
});
