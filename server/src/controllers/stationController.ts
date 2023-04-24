import { Request, Response, query } from "express";
import { AppDataSource } from "../db/data-source";
import { Station } from "../db/entity/Station";
import {
  applyPagination,
  applySearch,
  getStationDetail,
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
      "station.longitude",
      "station.latitude",
    ]);

  applyPagination(queryBuilder, page);
  applySearch(queryBuilder, search);

  const stations = await queryBuilder.getRawMany();

  res.json({
    success: true,
    message: `Retrieved stations successfully.`,
    data: {
      stations: stations,
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
  const { id, name, address } = req.body;

  // import addressGeocode from "../lib/addressGeocode";
  // it convers address to coordinates
  // const {latitude, longitude} = addressGeocode(address: string)

  const latitude = 0;
  const longitude = 0;

  const newStation = { id, name, address, latitude, longitude };
  const stationRepository = AppDataSource.getRepository(Station);

  // find by id if station already exists
  const savedStation = await stationRepository.findOne({
    where: { id },
  });

  if (savedStation) {
    return res.json({
      success: false,
      message: `Station already exists.`,
    });
  }

  const station = stationRepository.create(newStation);
  const result = await stationRepository.save(station);

  res.json({
    success: true,
    message: `Station added successfully.`,
    data: result,
  });
};
