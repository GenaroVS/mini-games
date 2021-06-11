import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import boardReducers from './reducers';

export type Tile = {
  value: number;
  flag: boolean;
  revealed: boolean;
}
export type BoardType = Tile[][];

export interface BoardState {
  board: BoardType;
  size: number;
  bombs: number;
}

const initialState: BoardState = {
  board: [],
  size: 0,
  bombs: 0,
};

export const counterSlice = createSlice({
  name: 'board',
  initialState,
  reducers: boardReducers
});

export const { build, reveal } = counterSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default counterSlice.reducer;
