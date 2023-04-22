import express from "express";
import { addJourney, getJourneys } from "../controllers/journeyController";

export const journeyRoutes = express.Router();

journeyRoutes.get("/api/journeys", getJourneys);
journeyRoutes.post("/api/journeys", addJourney);
