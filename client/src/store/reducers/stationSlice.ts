import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { NewStationType, StationState } from '../../models/stationsInterface';
import {
  StationsQueryType,
  getStations,
  postStation,
} from '../../api/StationAPI';

const name = 'stations';

const initialState: StationState = {
  stations: [],
  totalPages: 0,
  status: 'loading',
  error: false,
};

export const fetchStations = createAsyncThunk(
  `${name}/fetchStations`, // action type
  async (props: StationsQueryType, thunkAPI) => {
    try {
      const { data } = await getStations({
        ...props,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewStation = createAsyncThunk(
  `${name}/addNewStation`,
  async (newStation: NewStationType) => {
    // post request
    const response = await postStation(newStation);
    return response.data;
  }
);

const stationSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stations = action.payload.stations;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchStations.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(addNewStation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stations.push(action.payload);
      })
      .addCase(addNewStation.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAllStations = (state: RootState) => state.stations.stations;
export const selectStationsTotalPages = (state: RootState) =>
  state.stations.totalPages;
export default stationSlice.reducer;
