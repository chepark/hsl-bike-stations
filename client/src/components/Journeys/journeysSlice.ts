import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  JourneyType,
  JourneysData,
  JourneysState,
} from "../../models/journeysInterface";
import { getJourneys } from "../../api/JourneyAPI";
import { RootState } from "../../app/store";

// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
const name = "journeys";

// ! 3. set initial state
const initialState = {
  journeys: [],
  totalPages: 0,
  status: "loading",
  error: false,
} as JourneysState;

export const fetchJourneys = createAsyncThunk(
  `${name}/fetchJourneys`, // action type
  async ({ currentPage }: { currentPage: number }, thunkAPI) => {
    try {
      // ! pass query later
      const data = await getJourneys({ currentPage });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // or
      // return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
);

// ! 4. create slice
const journeysSlice = createSlice({
  name,
  initialState,
  reducers: {},
  // ! 5. use extra reducer to handle async thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchJourneys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJourneys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.journeys = action.payload.journeys;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchJourneys.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

// ! 5. Create selector and export
export const selectAllJourneys = (state: RootState) => state.journeys.journeys;
export const selectJourneysTotalPages = (state: RootState) =>
  state.journeys.totalPages;
export const selectJourneysStatus = (state: RootState) => state.journeys.status;

// ! 6 export reducer
// ex
// export const { setTitle } = todoSlice.actions;
export default journeysSlice.reducer;

// ! Additional
//export const lists = (state: RootState) => state.todoSlice.lists;
//export const titles = (state: RootState) => state.todoSlice.title;
