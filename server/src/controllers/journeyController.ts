import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Journey } from "../db/entity/Journey";
import {
  applyFilter,
  applyPagination,
  applySearch,
  applySort,
  FilterParams,
  saveNewJourney,
} from "../services/journeyService";
import { durationCalculator } from "../lib/durationCalculator";
import { distanceCalculator } from "../lib/distanceCalculator";
import {
  findStationById,
  stationCoordinates,
} from "../services/stationService";
import { saveNewRoute } from "../services/routeService";

export const getJourneys = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 0; // default offset is 0 if not provided
  const sort = (req.query.sort as string) || "journey.id"; // default sort parameter is journey.id if not provided
  const search = (req.query.search as string | null) || null;
  const filters: FilterParams = {
    departure: (req.query.departure as string | null) || null,
    return: (req.query.return as string | null) || null,
    duration: (req.query.duration as string | null) || null,
    distance: (req.query.distance as string | null) || null,
  };

  const queryBuilder = AppDataSource.getRepository(Journey)
    .createQueryBuilder("journey")
    .leftJoin("journey.route", "route")
    .leftJoin("route.startingStation", "startingStation")
    .leftJoin("route.endingStation", "endingStation")
    .select([
      "journey.id",
      "journey.started_at",
      "journey.ended_at",
      "journey.duration_sec",
      "startingStation.name",
      "endingStation.name",
      "route.distance_meter",
    ]);

  applyPagination(queryBuilder, page);
  if (sort) applySort(queryBuilder, sort);
  if (search) applySearch(queryBuilder, search);
  if (filters) applyFilter(queryBuilder, filters);

  const journeys = await queryBuilder.getRawMany();

  //! add function to handle no result found

  res.json({
    success: true,
    message: `Retrieved journeys successfully.`,
    data: {
      journeys: journeys,
    },
  });
};

export const getJourney = async (req: Request, res: Response) => {};

export const addJourney = async (req: Request, res: Response) => {
  const { started_at, ended_at, startingStation, endingStation } = req.body;

  // Find the starting and ending stations by their IDs
  const startingStationObj = await findStationById(startingStation);
  const endingStationObj = await findStationById(endingStation);
  const startCoordinates = await stationCoordinates(startingStationObj);
  const endCoordinates = await stationCoordinates(endingStationObj);
  let duration_sec: number;
  let distance_meter: number;

  if (!startCoordinates || !endCoordinates) {
    res.status(500).json({
      message: "cannot find coordinates of starting/ending station",
    });
  } else if (startCoordinates && endCoordinates) {
    duration_sec = durationCalculator(started_at, ended_at);
    distance_meter = distanceCalculator(startCoordinates, endCoordinates);

    const newJourney = { started_at, ended_at, duration_sec };
    const savedJourney = await saveNewJourney(newJourney);

    const newRoute = {
      startingStation,
      endingStation,
      distance_meter,
    };

    const savedRoute = await saveNewRoute(newRoute, savedJourney);
  }
};
