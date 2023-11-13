import axios from 'axios';
import { GEOCODE_NOMINATIM_BASE_URL } from '../utils/constants';
import { NewStationType } from '../models/stationsInterface';

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
  // nginx will redirect to the proper url
  const apiUrl = `/api/stations?page=${pageQuery}${search}${filter}`;

  const response = await axios.get(apiUrl);
  const { data } = response;

  return data;
};

export const getStationDetail = async (id: number) => {
  // nginx will redirect to the proper url
  const apiUrl = `/api/stations/${id}`;

  const response = await axios.get(apiUrl);
  const { data } = response;

  return data;
};

export const getNewStationCoordinates = async (
  city: string,
  street: string
) => {
  try {
    const apiUrl =
      GEOCODE_NOMINATIM_BASE_URL +
      `/search?format=json&city=${city}&street=${street}&country=Finland&limit=1`;

    const response = await axios.get(apiUrl);
    const { data } = response;

    if (data.length > 0) {
      return { latitude: data[0].lat, longitude: data[0].lon } ?? null;
    } else return null;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const postStation = async (newStation: NewStationType) => {
  // nginx will redirect to the proper url
  const apiUrl = `/api/stations`;

  try {
    const response = await axios.post(apiUrl, newStation);
    const { data } = response;

    console.log('new station', data);
    return data;
  } catch (error) {
    return error;
  }
};
