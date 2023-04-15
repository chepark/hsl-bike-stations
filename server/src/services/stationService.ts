import { SelectQueryBuilder } from "typeorm";
import { Station } from "../db/entity/Station";
import { Route } from "../db/entity/Route";

// pagination
export const applyPagination = (
  queryBuilder: SelectQueryBuilder<Station>,
  page: number
) => {
  queryBuilder.offset(page * 10).limit(15);

  // how to get total number of pages?
  // const total = await queryBuilder.getCount();
  // const totalPages = Math.ceil(total / 15);
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

// return stations showing on the map
// - based on the current map location of the user
