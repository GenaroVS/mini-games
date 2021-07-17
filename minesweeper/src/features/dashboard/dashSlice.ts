import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import dashReducers from './reducers';

export const HIGHSCORECOUNT = 20;

export interface HighScore {
  score: number;
  level: string;
}

export type DashState = {
  clock: number;
  width: number;
  height: number;
  level: string;
  flagTotal: number;
  isPlaying: boolean;
  isHighScore: boolean;
  highScore: HighScore | null;
}

const initialState: DashState = {
  clock: 0,
  width: 0,
  height: 0,
  flagTotal: 0,
  level: 'intermediate',
  isPlaying: false,
  isHighScore: false,
  highScore: null
}

export const dashSlice = createSlice({
  name: 'dash',
  initialState,
  reducers: dashReducers
});

export const { setLevel, tick, reset, setHighScore } = dashSlice.actions;

export const selectDash = (state: RootState) => state.dash;
export const selectDashAttri = createSelector(
  (state: RootState) => state.dash.isPlaying,
  (state: RootState) => state.dash.clock,
  (state: RootState) => state.dash.level,
  (isPlaying, clock, level) => ({ isPlaying, clock, level })
)

export default dashSlice.reducer;
