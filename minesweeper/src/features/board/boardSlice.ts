import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type board = number[][];
type coord = {
  readonly row: number,
  readonly col: number
}

const revealTraverse = (board: board, row: number, col: number) => {

}

export interface BoardState {
  board: board;
}

const initialState: BoardState = {
  board: []
};

export const counterSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    build: (state, action: PayloadAction<board>) => {
      state.board = action.payload;
    },

    reveal: (state, action: PayloadAction<coord>) => {
      let { row, col } = action.payload
      revealTraverse(state.board, row, col);
    }
  }
});

export const { build, reveal } = counterSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default counterSlice.reducer;
