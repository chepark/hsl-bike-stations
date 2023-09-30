import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { JourneysState } from '../../models/journeysInterface';
import { GetJourneysProps, getJourneys } from '../../api/JourneyAPI';
import type { RootState } from '..';

// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
const name = 'journeys';

const initialState = {
  journeys: [],
  totalPages: 0,
  status: 'loading',
  durationRange: { min: 0, max: 0 },
  distanceRange: { min: 0, max: 0 },
  error: false,
} as JourneysState;

export const fetchJourneys = createAsyncThunk(
  `${name}/fetchJourneys`, // action type
  async (props: GetJourneysProps, thunkAPI) => {
    try {
      const data = await getJourneys({
        ...props,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const journeysSlice = createSlice({
  name,
  initialState,
  reducers: {},
  /* eslint-disable no-return-assign, no-param-reassign */
  extraReducers: (builder) => {
    builder
      .addCase(fetchJourneys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJourneys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.journeys = action.payload.journeys;
        state.durationRange = action.payload.durationRange;
        state.distanceRange = action.payload.distanceRange;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchJourneys.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

// ! 5. Create selector and export
export const selectAllJourneys = (state: RootState) => state.journeys.journeys;
export const selectJourneysTotalPages = (state: RootState) =>
  state.journeys.totalPages;
export const selectJourneysDurationRange = (state: RootState) =>
  state.journeys.durationRange;
export const selectJourneysDistanceRange = (state: RootState) =>
  state.journeys.distanceRange;
export const selectJourneysStatus = (state: RootState) => state.journeys.status;

// ! 6 export reducer

// export const { setTitle } = todoSlice.actions;

export default journeysSlice.reducer;

// ! Additional
// export const lists = (state: RootState) => state.todoSlice.lists;
// export const titles = (state: RootState) => state.todoSlice.title;
