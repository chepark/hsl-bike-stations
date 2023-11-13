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

  // nginx will redirect to the proper url
  const apiUrl = `/api/journeys?page=${pageQuery}${departureStation}${returnStation}${distance}${duration}`;
  const response = await axios.get(apiUrl);

  const { data } = response;

  return data;
};

// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
