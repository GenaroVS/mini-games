import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import dashReducers from './reducers';

export type DashState = {
  clock: number;
  width: number;
  height: number;
  difficulty: string;
  flagTotal: number;
  isPlaying: boolean;
}

const initialState: DashState = {
  clock: 0,
  width: 0,
  height: 0,
  flagTotal: 0,
  difficulty: 'intermediate',
  isPlaying: false
}

export const dashSlice = createSlice({
  name: 'dash',
  initialState,
  reducers: dashReducers
});

export const { setDifficulty, tick, reset } = dashSlice.actions;

export const selectDash = (state: RootState) => state.dash;

export default dashSlice.reducer;
