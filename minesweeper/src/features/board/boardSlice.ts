import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import boardReducers from './reducers';

export type TileType = {
  value: number;
  isBomb: boolean;
  flagged: boolean;
  revealed: boolean;
}
export type BoardType = TileType[][];

export interface BoardState {
  board: BoardType;
  tilesNeeded: number;
  gameOver: boolean;
}

const initialState: BoardState = {
  board: [],
  tilesNeeded: Infinity,
  gameOver: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: boardReducers
});

export const { build, reveal, endGame, flag } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
