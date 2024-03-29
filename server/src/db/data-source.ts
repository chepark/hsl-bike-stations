import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Station } from "./entity/Station.js";
import { Route } from "./entity/Route.js";
import { Journey } from "./entity/Journey.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_DOCKER_SERVICE_NAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  synchronize: true,
  entities: [Station, Route, Journey],
});
