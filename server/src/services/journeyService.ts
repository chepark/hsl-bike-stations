import { SelectQueryBuilder } from "typeorm";
import { Journey } from "../db/entity/Journey";

export const applyPagination = (
  queryBuilder: SelectQueryBuilder<Journey>,
  page: number
) => {
  const limit: number = 10;
  const offset: number = page * limit;

  queryBuilder.offset(offset).limit(limit);
};

export const applySort = (
  queryBuilder: SelectQueryBuilder<Journey>,
  sortQuery: string
) => {
  sortQuery.split(",").forEach((sortValue) => {
    let order: "ASC" | "DESC" = sortValue.includes("-") ? "DESC" : "ASC";
    let column = sortValue.replace("-", "");

    queryBuilder.addOrderBy(column, order);
  });
};

export interface FilterParams {
  departure: string | null;
  return: string | null;
  duration: string | null;
  distance: string | null;
}

export const applyFilter = (
  queryBuilder: SelectQueryBuilder<Journey>,
  filterQuery: FilterParams
) => {
  Object.keys(filterQuery).forEach((key) => {
    const value = filterQuery[key as keyof FilterParams];

    if (value !== null && value !== undefined) {
      switch (key) {
        case "departure":
          queryBuilder.andWhere("startingStation.name = :startingStation", {
            startingStation: value,
          });
          break;
        case "return":
          queryBuilder.andWhere("endingStation.name = :endingStation", {
            endingStation: value,
          });
          break;
        case "duration":
          const [minDuration, maxDuration] = value.split("-");
          queryBuilder.andWhere("duration_sec BETWEEN :min AND :max", {
            min: minDuration,
            max: maxDuration,
          });
          break;
        case "distance":
          const [minDistance, maxDistance] = value.split("-");
          queryBuilder.andWhere("distance_meter BETWEEN :min AND :max", {
            min: minDistance,
            max: maxDistance,
          });
          break;
      }
    }
  });
};

// add search
export const applySearch = (
  queryBuilder: SelectQueryBuilder<Journey>,
  searchQuery: string | null
) => {
  queryBuilder
    .where("CAST(journey.id AS TEXT) LIKE :id", {
      id: `%${searchQuery}%`,
    })
    .orderBy("journey.id", "ASC");
};
