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
  let { board } = state
  state.tilesNeeded -= 1;
  board[row][col].revealed = true;
  if (board[row][col].value > 0) return;


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

const createBoard = (width: number, height: number):BoardType => {
  var board: BoardType = [];
  for (var i = 0; i < height; i++) {
    board.push([]);
    for (var j = 0; j < width; j++) {
      board[i].push({
        value: 0,
        isBomb: false,
        flagged: false,
        revealed: false
      });
    }
  }
  return board;
}

const setRandBombs = (board: BoardType, start: number[], bombs: number):BoardType => {
  let height = board.length;
  let width = board[0].length;
  let [startY, startX] = start;
  let probabilityCap = 1000;

  while (bombs > 0) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);

    if (probabilityCap < 0) {
      board[y][x].isBomb = true;
      bombs -= 1;
    } else if (
        Math.abs(startX - x) > 1 &&
        Math.abs(startY - y) > 1 &&
        !board[y][x].isBomb
        ) {
      board[y][x].isBomb = true;
      bombs -= 1;
    }
    probabilityCap -= 1;
  }

  return board;
}

const calcBoard = (board: BoardType):BoardType => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].value = getNeabyBombCount(board, i, j);
    }
  }
  return board;
}

const getNeabyBombCount = (board: BoardType, row: number, col: number):number => {
  let bombsNearby = 0;
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
  return bombsNearby;
}

const boardReducers = {
  build: (state: BoardState, action: PayloadAction<buildPayload>) => {
    let { width, height, bombs } = action.payload;
    state.gameOver = false;
    state.flags = bombs;

    if (window.innerWidth <= 920 && bombs === 99) {
      state.board = createBoard(height, width) // flip the board
    } else if (window.innerWidth <= 640) {
      state.board = createBoard(height, width) // flip the board
    } else {
      state.board = createBoard(width, height)
    }

    if (width * height - bombs === 0) {
      state.tilesNeeded = Infinity;
    } else {
      state.tilesNeeded = width * height - bombs;
    }
  },

  initMove: (state: BoardState, action: PayloadAction<{ start: number[] }>) => {
    let { start } = action.payload
    let boardWithBombs = setRandBombs(state.board, start, state.flags);
    state.board = calcBoard(boardWithBombs);
    revealTraverse(state, start[0], start[1]);
  },

  reveal: (state: BoardState, action: PayloadAction<revealPayload>) => {
    let { row, col } = action.payload
    revealTraverse(state, row, col);
  },

  endGame: (state: BoardState) => {
    state.gameOver = true;
    state.tilesNeeded = Infinity;
  },

  flag: (state: BoardState, action: PayloadAction<revealPayload>) => {
    let { row, col } = action.payload;
    let tile = state.board[row][col];
    if (tile.flagged) {
      tile.flagged = false;
      state.flags += 1;
    } else {
      tile.flagged = true;
      state.flags -= 1;
    }
  }
}

export default boardReducers;