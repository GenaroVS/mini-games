import { PayloadAction } from '@reduxjs/toolkit';
import { BoardState, BoardType } from './boardSlice';

type revealPayload = {
  readonly row: number,
  readonly col: number
}

type buildPayload = {
  readonly width: number;
  readonly height: number;
  readonly bombs: number;
}

const revealTraverse = (state: BoardState, row: number, col: number) => {
  let bombsNearby = 0;
  let { board } = state
  state.tilesNeeded -= 1;


  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      if (board[row + i] && board[row + i][col + j]) {
        if (board[row + i][col + j].isBomb) {
          bombsNearby += 1;
        }
      }
    }
  }



  board[row][col].value = bombsNearby;
  board[row][col].revealed = true;
  if (bombsNearby > 0) {
    return;
  }

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      if (board[row + i] && board[row + i][col + j]) {
        if (!board[row + i][col + j].revealed) {
          revealTraverse(state, row + i, col + j);
        }
      }
    }
  }
}

const createRandBoard = (bombs: number, width: number, height: number):BoardType => {
  var randBoard: BoardType = [];
  for (var i = 0; i < height; i++) {
    randBoard.push([]);
    for (var j = 0; j < width; j++) {
      randBoard[i].push({
        value: 0,
        isBomb: false,
        flagged: false,
        revealed: false
      });
    }
  }
  while (bombs > 0) {
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);
    randBoard[y][x].isBomb ? bombs += 1 : randBoard[y][x].isBomb = true;
    bombs -= 1;
  }

  return randBoard;
}

const boardReducers = {
  build: (state: BoardState, action: PayloadAction<buildPayload>) => {
    let { width, height, bombs } = action.payload;
    state.board = createRandBoard(bombs, width, height)
    state.tilesNeeded = (width * height) - bombs;
  },

  reveal: (state: BoardState, action: PayloadAction<revealPayload>) => {
    let { row, col } = action.payload
    revealTraverse(state, row, col);
  },

  endGame: (state: BoardState) => {
    state.gameOver = true;
  },

  flag: (state: BoardState, action: PayloadAction<revealPayload>) => {
    let { row, col } = action.payload;
    let tile = state.board[row][col];
    tile.flagged = !tile.flagged
  }
}

export default boardReducers;