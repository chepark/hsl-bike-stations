import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source.js";
import { Journey } from "./db/entity/Journey.js";
import { Route } from "./db/entity/Route.js";
import { Station } from "./db/entity/Station.js";

const port = 8000;
const app: Express = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error("Error during DataSourceInitialization", err);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
  const t = AppDataSource.getRepository(Journey);
  t.find().then((stations) => {
    console.log("---------------------------");
    console.log(stations);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
