import axios from 'axios';

export type StationsQueryType = {
  pageQuery: number;
  searchQuery?: string;
  filterQuery?: string;
};

export const getStations = async ({
  pageQuery,
  searchQuery,
  filterQuery,
}: StationsQueryType) => {
  const search = searchQuery ? `&search=${searchQuery}` : '';
  const filter = filterQuery ? `&filter=${filterQuery}` : '';

  const apiUrl = `http://localhost:8000/api/stations?page=${pageQuery}${search}${filter}`;
  const response = await axios.get(apiUrl);
  const { data } = response;

  return data;
};
