// sort parameters in journey table
export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const SORT = {
  BY_ID: 'journey.id',
  BY_STARTING_STATION: 'startingStation.name',
  BY_ENDING_STATION: 'endingStation.name',
  BY_DISTANCE: 'route.distance_meter',
  BY_DURATION: 'journey.duration_sec',
};

export const GEOCODE_NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
