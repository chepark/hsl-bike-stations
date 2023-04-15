import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Journey } from "../db/entity/Journey";
import {
  applyFilter,
  applyPagination,
  applySearch,
  applySort,
  FilterParams,
} from "../services/journeyService";

export const getJourneys = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 0; // default offset is 0 if not provided
  const sort = (req.query.sort as string) || "journey.id";
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
  applySort(queryBuilder, sort);
  applySearch(queryBuilder, search);
  applyFilter(queryBuilder, filters);

  const journeys = await queryBuilder.getRawMany();

  res.json({
    success: true,
    message: `Retrieved journeys successfully.`,
    data: {
      journeys: journeys,
    },
  });
};

export const getJourney = async (req: Request, res: Response) => {};

export const addJourney = async (req: Request, res: Response) => {};
