interface Coordinates {
  longitude: number;
  latitude: number;
}

export const distanceCalculator = (
  start_cooridnate: Coordinates,
  end_coordinate: Coordinates
) => {
  const UNIT = "km";
  const R = 6371; // radius of the earth in km

  const dLat = toRadians(end_coordinate.latitude - start_cooridnate.latitude);
  const dLon = toRadians(end_coordinate.longitude - start_cooridnate.longitude);
  // a is the square of half the chord length between the points.
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(start_cooridnate.latitude)) *
      Math.cos(toRadians(start_cooridnate.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  // c is the angular distance in radians.
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  const distance_meter = Math.round(distance * 1000);
  return distance_meter;
};

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
