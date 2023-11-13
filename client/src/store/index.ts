import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import journeysReducer from './reducers/journeysSlice';
import stationReducer from './reducers/stationSlice';

const store = configureStore({
  reducer: { journeys: journeysReducer, stations: stationReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
