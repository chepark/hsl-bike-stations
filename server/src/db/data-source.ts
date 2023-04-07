import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Station } from "./entity/Station.js";
import { Route } from "./entity/Route.js";
import { Journey } from "./entity/Journey.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1111",
  database: "city-bike",
  entities: [Station, Route, Journey],
});
