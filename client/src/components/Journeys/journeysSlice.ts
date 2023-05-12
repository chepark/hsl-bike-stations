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
import { RootState } from "../../store";

// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
const name = "journeys";

// ! 2. set state type
type stateType = {
  journeys: JourneyType[];
  totalPages: number;
  loading: boolean;
  error: boolean;
};

// ! 3. set initial state
const initialState = {
  journeys: [],
  totalPages: 0,
  loading: false,
  error: false,
} as JourneysState;

export const fetchJourneys = createAsyncThunk(
  `${name}/fetchJourneys`, // action type
  async (query, thunkAPI) => {
    try {
      // ! pass query later
      const response = await getJourneys();
      return response.data;
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
  extraReducers(builder) {
    builder
      .addCase(fetchJourneys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchJourneys.fulfilled, (state, action) => {
        state.loading = false;
        state.journeys = action.payload.journeys;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchJourneys.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// ! 5. Create selector and export
export const selectAllJourneys = (state: RootState) => state.journeys;

// ! 6 export reducer
// ex
// export const { setTitle } = todoSlice.actions;
export default journeysSlice.reducer;

// ! Additional
//export const lists = (state: RootState) => state.todoSlice.lists;
//export const titles = (state: RootState) => state.todoSlice.title;
