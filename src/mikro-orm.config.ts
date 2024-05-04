import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Migrator } from "@mikro-orm/migrations";
import { Options } from "@mikro-orm/core";
import { defineConfig } from "@mikro-orm/postgresql";
import path from "path";
import { User } from "./entities/User";

const config: Options = defineConfig({
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}",
  },
  extensions: [Migrator],
  allowGlobalContext: true,
  entities: [Post, User],
  dbName: "lireddit",
  password: "postgres",
  debug: !__prod__,
});

export default config;
