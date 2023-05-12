export interface JourneyType {
  journey_id: number;
  journey_started_at: string;
  journey_ended_at: string;
  journey_duration_sec: number;
  route_distance_meter: number;
  startingStation_name: string;
  endingStation_name: string;
}

export interface JourneysData {
  success: boolean;
  message: string;
  data: {
    totalPages: number;
    journeys: JourneyType[];
  };
}

export interface JourneysState {
  journeys: JourneyType[];
  totalPages: number;
  loading: boolean;
  error: boolean;
}
