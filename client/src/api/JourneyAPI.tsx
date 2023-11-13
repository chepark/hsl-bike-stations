import axios from 'axios';

export type GetJourneysProps = {
  pageQuery: number;
  departureQuery?: string;
  returnQuery?: string;
  distanceQuery?: string;
  durationQuery?: string;
};

export const getJourneys = async ({
  pageQuery,
  departureQuery,
  returnQuery,
  distanceQuery,
  durationQuery,
}: GetJourneysProps) => {
  const departureStation = departureQuery ? `&departure=${departureQuery}` : '';
  const returnStation = returnQuery ? `&return=${returnQuery}` : '';
  const distance = distanceQuery ? `&distance=${distanceQuery}` : '';
  const duration = durationQuery ? `&duration=${durationQuery}` : '';

  // const apiUrl = `http://localhost:8000/api/journeys?page=${pageQuery}${departureStation}${returnStation}${distance}${duration}`;
  const apiUrl = `/api/journeys?page=${pageQuery}${departureStation}${returnStation}${distance}${duration}`;

  const response = await axios.get(
    // `${VITE_BASE_URL}/journeys?page=${pageQuery}`
    apiUrl
  );

  const { data } = response;

  return data;
};

export const getJourneysBySearchQuery = async () => {};

// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
