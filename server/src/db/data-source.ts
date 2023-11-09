import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Station } from "./entity/Station.js";
import { Route } from "./entity/Route.js";
import { Journey } from "./entity/Journey.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://postgres:password@docker-postgres-service-name:5432/city-bike", // modify according to docker setup
  synchronize: true,
  entities: [Station, Route, Journey],
});
