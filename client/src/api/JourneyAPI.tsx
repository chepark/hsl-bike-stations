import axios from "axios";
import { JourneysData } from "../models/journeysInterface";

const { VITE_BASE_URL } = import.meta.env;

export const getJourneys = async () => {
  const response: JourneysData = await axios.get(`${VITE_BASE_URL}/journeys`);
  return response;
};
