import { SelectQueryBuilder, Equal } from "typeorm";
import { Station } from "../db/entity/Station";
import { Route } from "../db/entity/Route";
import { AppDataSource } from "../db/data-source";

// pagination
export const applyPagination = async (
  queryBuilder: SelectQueryBuilder<Station>,
  page: number
) => {
  const stationsPerPage: number = 15;
  const offset: number = page * stationsPerPage;

  page == 0 ? queryBuilder : queryBuilder.offset(offset).limit(15);

  const totalStations = await queryBuilder.getCount();
  const totalPages = Math.ceil(totalStations / stationsPerPage);

  return totalPages;
};

// search by id or name
export const applySearch = (
  queryBuilder: SelectQueryBuilder<Station>,
  searchQuery: string | null
) => {
  let searchBy: "name" | "id" = "name";

  if (searchQuery) {
    !isNaN(parseInt(searchQuery)) && (searchBy = "id");
  }

  if (searchQuery && searchBy === "id") {
    queryBuilder
      .where("CAST(station.id AS TEXT) LIKE :id", {
        id: `%${searchQuery}%`,
      })
      .orderBy("station.id", "ASC");
  } else if (searchQuery && searchBy === "name") {
    queryBuilder
      .where("LOWER(station.name) LIKE LOWER(:search)", {
        search: `%${searchQuery}%`,
      })
      .orderBy("station.name", "ASC");
  }
};

export const getStationDetail = async (
  queryBuilder: SelectQueryBuilder<Route>,
  stationId: number
) => {
  const startingJouneysCount = await queryBuilder
    .where("route.startingStation = :stationId", { stationId })
    .getCount();

  const endingJourneysCount = await queryBuilder
    .where("route.endingStation = :stationId", { stationId })
    .getCount();

  const startingJourneysAvgDistance = await queryBuilder
    .select("AVG(route.distance_meter)", "avgDistance")
    .where("route.startingStation = :stationId", { stationId })
    .getRawOne();

  const endingJourneysAvgDistance = await queryBuilder
    .select("AVG(route.distance_meter)", "avgDistance")
    .where("route.endingStation = :stationId", { stationId })
    .getRawOne();

  let top5endingStations = await queryBuilder
    .select("endingStation.name", "endingstationname")
    .addSelect("COUNT(*)", "count")
    .innerJoin("route.endingStation", "endingStation")
    .where("route.startingStation = :stationId", { stationId })
    .groupBy("endingStationName")
    .orderBy("count", "DESC")
    .limit(5)
    .getRawMany();

  top5endingStations = top5endingStations.map((station) => {
    const name = station.endingstationname;
    const count = Number(station.count);
    return { name, count };
  });

  let top5startingStations = await queryBuilder
    .select("startingStation.name", "startingstationname")
    .addSelect("COUNT(*)", "count")
    .innerJoin("route.startingStation", "startingStation")
    .where("route.endingStation = :stationId", { stationId })
    .groupBy("startingStationName")
    .orderBy("count", "DESC")
    .limit(5)
    .getRawMany();

  top5startingStations = top5startingStations.map((station) => {
    const name = station.startingstationname;
    const count = Number(station.count);
    return { name, count };
  });

  return {
    startingJouneysCount,
    endingJourneysCount,
    startingJourneysAvgDistance: Number(
      startingJourneysAvgDistance.avgDistance
    ),
    endingJourneysAvgDistance: Number(endingJourneysAvgDistance.avgDistance),
    top5endingStations,
    top5startingStations,
  };
};
export const findStationById = async (stationId: number) => {
  const stationRepository = AppDataSource.getRepository(Station);
  const stationObject = await stationRepository.findBy({
    id: stationId,
  });

  return stationObject[0];
};

export const findStationByName = async (stationName: string) => {
  const stationRepository = AppDataSource.getRepository(Station);
  const stationObject = await stationRepository.findBy({
    name: Equal(stationName),
  });

  return stationObject[0];
};

interface StationObject {
  id: number;
  name: string;
  address?: string;
  longitude?: number;
  latitude?: number;
}

export const stationCoordinates = async (stationObj: StationObject) => {
  if (!stationObj.longitude && !stationObj.latitude) {
    return null;
  }

  let { longitude, latitude } = stationObj;
  longitude = Number(longitude);
  latitude = Number(latitude);

  const coordinates = { longitude, latitude };

  return coordinates;
};

interface NewStation {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export const saveNewStation = async (newStation: NewStation) => {
  const stationRepository = AppDataSource.getRepository(Station);
  const station = stationRepository.create(newStation);
  const result = await stationRepository.save(station);

  return result;
};
// return stations showing on the map
// - based on the current map location of the user
