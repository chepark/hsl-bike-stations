import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;

export const getJourneys = async ({ currentPage }: { currentPage: number }) => {
  const response = await axios.get(
    // `${VITE_BASE_URL}/journeys?page=${currentPage}`
    `http://localhost:8000/api/journeys?page=${currentPage}`
  );
  const { data } = response;
  return data;
};

export const getJourneysBySearchQuery = async () => {};

// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
