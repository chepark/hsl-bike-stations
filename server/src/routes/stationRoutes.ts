import express from "express";
import { getStations, getStationById } from "../controllers/stationController";

export const stationRoutes = express.Router();

stationRoutes.get("/api/stations", getStations);
stationRoutes.get("/api/stations/:id", getStationById);
