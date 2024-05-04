import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Express.SessionStore };
  redis: Redis;
  res: Response;
};

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
