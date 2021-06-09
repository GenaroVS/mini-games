import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { build, reveal } from './boardSlice';
import './board.css';

type board = number[][];

const Board = () => {
  const state = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  const createRandBoard = (bombs: number, size: number):board => {
    var randBoard: board = [];
    for (var i = 0; i < size; i++) {
      randBoard.push([]);
      for (var j = 0; j < size; j++) {
        randBoard[i].push(0);
      }
    }
    while (bombs > 0) {
      var x = Math.floor(Math.random() * size);
      var y = Math.floor(Math.random() * size);
      randBoard[y][x] === 1 ? bombs += 1 : randBoard[y][x] = 1;
      bombs -= 1;
    }

    return randBoard;
  }

  const renderBoard = (board: board):JSX.Element[][] => {
    return board.map((row, i) => {
      return row.map((box, j) => {
        if (box === 1) {
          return <div className='bomb' data-row={i} data-col={j}></div>;
        } else {
          return <div className='box' data-row={i} data-col={j}></div>
        }
      });
    });
  }

  const clickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let target = e.target as typeof e.target & {
      dataset: {
        row: string,
        col: string
      }
    };

    let { row, col } = target.dataset;
    dispatch(reveal({
      row: parseInt(row, 10),
      col: parseInt(col, 10)
    }));

  }

  useEffect(() => {
    dispatch(build(createRandBoard(10, 10)));
  }, [dispatch])

  return (
    <div onClick={clickHandler} className='board'>
      {state && renderBoard(state.board)}
    </div>
  )
}

export default Board;
