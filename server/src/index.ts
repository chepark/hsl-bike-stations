import "reflect-metadata";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./db/data-source.js";
import { Journey } from "./db/entity/Journey.js";
import { Route } from "./db/entity/Route.js";
import { Station } from "./db/entity/Station.js";
import { journeyRoutes } from "./routes/journeyRoutes.js";
import { stationRoutes } from "./routes/stationRoutes.js";

const port = 8000;
const app: Express = express();

// connect to database
AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("Error in DB connection: ", err);
  });

// middleware

app.use(cors());
app.use(bodyParser.json());

// ! remove later
// ! study about 304 error code and change to other solution.
app.disable("etag");

app.use(journeyRoutes);
app.use(stationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
