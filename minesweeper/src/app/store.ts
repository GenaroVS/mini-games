import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import dashSlice from '../features/dashboard/dashSlice';
import leadersSlice from '../features/leaders/leadersSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    dash: dashSlice,
    leaders: leadersSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;