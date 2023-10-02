export interface StationType {
  station_id: number;
  station_name: string;
  station_address: string;
  station_longitude: string;
  station_latitude: string;
}
export interface StationState {
  stations: StationType[];
  totalPages: number;
  status: 'loading' | 'succeeded' | 'failed';
  error: boolean;
}
