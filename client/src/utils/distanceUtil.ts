import { StationType } from '../models/stationsInterface';

function degreesToRadians(degres: number) {
  return degres * (Math.PI / 180);
}

function stationCoordinates(
  stationName: string,
  stations: StationType[]
): { latitude: number; longitude: number } {
  const stationDetail = stations.find(
    (station) => station.station_name === stationName
  );

  return {
    latitude: Number(stationDetail!.station_latitude),
    longitude: Number(stationDetail!.station_longitude),
  };
}

export function distanceBetweenCoordinates(
  startingStationName: string,
  endingStationName: string,
  stations: StationType[]
) {
  let { latitude: startingLat, longitude: startingLng } = stationCoordinates(
    startingStationName,
    stations
  );
  let { latitude: endingLat, longitude: endingLng } = stationCoordinates(
    endingStationName,
    stations
  );

  const earthRadiusM = 6371000;

  const dLat = degreesToRadians(endingLat - startingLat);
  const dLon = degreesToRadians(endingLng - startingLng);

  startingLat = degreesToRadians(startingLat);
  endingLat = degreesToRadians(endingLat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(startingLat) *
      Math.cos(endingLat);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusM * c;
}
