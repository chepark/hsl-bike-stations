import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Station } from "./entity/Station.js";
import { Route } from "./entity/Route.js";
import { Journey } from "./entity/Journey.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [Station, Route, Journey],
});
