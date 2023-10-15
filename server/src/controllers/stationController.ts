import { Request, Response, query } from "express";
import { AppDataSource } from "../db/data-source";
import { Station } from "../db/entity/Station";
import {
  applyPagination,
  applySearch,
  findStationByName,
  getStationDetail,
  saveNewStation,
} from "../services/stationService";
import { Route } from "../db/entity/Route";
import { addressGeocode } from "../lib/addressGeocode";

export const getStations = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string);
  const search = (req.query.search as string) || null;

  const queryBuilder = AppDataSource.getRepository(Station)
    .createQueryBuilder("station")
    .select([
      "station.id",
      "station.name",
      "station.address",
      "station.longitude",
      "station.latitude",
    ]);

  const totalPages = await applyPagination(queryBuilder, page);
  applySearch(queryBuilder, search);

  const stations = await queryBuilder.getRawMany();

  res.json({
    success: true,
    message: `Retrieved stations successfully.`,
    data: {
      stations,
      totalPages,
    },
  });
};

export const getStationById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const queryBuilder =
    AppDataSource.getRepository(Route).createQueryBuilder("route");

  const stationDetail = await getStationDetail(queryBuilder, id);

  res.json({
    success: true,
    message: `Retrieved station successfully.`,
    data: stationDetail,
  });
};

export const addStation = async (req: Request, res: Response) => {
  // TODO: remove id, and find station by name and address
  const { name, address, coordinates } = req.body;

  // find by id if station already exists
  // const savedStation = await findStationById(id);
  // TODO: in findStionByName, if Equal check is case insensitive
  const savedStation = await findStationByName(name);

  if (savedStation) {
    return res.json({
      success: false,
      message: `Station already exists.`,
    });
  }

  // TODO: remove. It is handled in the frontend
  const { latitude, longitude } = await addressGeocode(address);
  // TODO: if latitude and longitude are null, return error
  const newStation = { name, address, latitude, longitude };
  const result = await saveNewStation(newStation);

  console.log("result", result);

  res.json({
    success: true,
    message: `Station added successfully.`,
    data: result,
  });
};
