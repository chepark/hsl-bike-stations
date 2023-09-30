export interface JourneyType {
  journey_id: number;
  // journey_started_at: string;
  // journey_ended_at: string;
  startingStation_name: string;
  endingStation_name: string;
  route_distance_meter: number;
  journey_duration_sec: number;
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
  durationRange: { min: number; max: number };
  distanceRange: { min: number; max: number };
  status: 'loading' | 'succeeded' | 'failed';
  error: boolean;
}
