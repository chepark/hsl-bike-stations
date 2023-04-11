import { SelectQueryBuilder } from "typeorm";
import { Station } from "../db/entity/Station";

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

// return stations showing on the map
// - based on the current map location of the user
