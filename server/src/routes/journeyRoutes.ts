import express from "express";
import { getJourneys } from "../controllers/journeyController";

export const journeyRoutes = express.Router();

journeyRoutes.get("/api/journeys", getJourneys);
