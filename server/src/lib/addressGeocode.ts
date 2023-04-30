// Google Geocode API
// need api_key from Google Cloud Console
import axios from "axios";

type Coordinates = { latitude: number; longitude: number };

export const addressGeocode = async (address: string): Promise<Coordinates> => {
  const response = await axios.get(
    `https://geocode.maps.co/search?q=${address}`
  );

  const { lat }: { lat: string } = response.data[0];
  const { lon }: { lon: string } = response.data[0];

  return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
};
