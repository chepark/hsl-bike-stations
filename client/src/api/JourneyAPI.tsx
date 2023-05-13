import axios from "axios";
import { JourneysData } from "../models/journeysInterface";

const { VITE_BASE_URL } = import.meta.env;

export const getJourneys = async () => {
  const response = await axios.get(`${VITE_BASE_URL}/journeys`);
  const data: JourneysData = response.data;
  return data.data;
};

// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
