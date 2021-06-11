import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import boardReducers from './reducers';

export type Tile = {
  value: number;
  isBomb: boolean;
  revealed: boolean;
}
export type BoardType = Tile[][];

export interface BoardState {
  board: BoardType;
  size: number;
  bombs: number;
  gameOver: boolean;
  gameWon: boolean;
}

const initialState: BoardState = {
  board: [],
  size: 0,
  bombs: 0,
  gameOver: false,
  gameWon: false
};

export const counterSlice = createSlice({
  name: 'board',
  initialState,
  reducers: boardReducers
});

export const { build, reveal, endGame } = counterSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default counterSlice.reducer;
