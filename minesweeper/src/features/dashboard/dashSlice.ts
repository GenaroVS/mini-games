import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import dashReducers from './reducers';

type DashState = {
  timer: number;
  size: number;
  difficulty: string;
}

const initialState: DashState = {
  timer: Infinity,
  size: 100,
  difficulty: 'medium',
}

export const dashSlice = createSlice({
  name: 'dash',
  initialState,
  reducers: dashReducers
});

export const {} = dashSlice.actions;

export const selectDash = (state: RootState) => state.dash;

export default dashSlice.reducer;
