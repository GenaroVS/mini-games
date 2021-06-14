import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { build, reveal, endGame, flag, BoardType } from './boardSlice';
import './board.css';
import Tile from './Tile';

/*
There are three difficulty levels for Minesweeper: beginner, intermediate, and expert.
Beginner has a total of ten mines and the board size is either 8 × 8, 9 × 9, or 10 × 10.
Intermediate has 40 mines and also varies in size between 13 × 15 and 16 × 16.
Finally, expert has 99 mines and is always 16 × 30 (or 30 × 16).
*/

const Board = () => {
  const { board, gameOver, tilesNeeded } = useAppSelector(state => state.board);
  const difficulty = useAppSelector(state => state.dash.difficulty);
  const width = useAppSelector(state => state.dash.width);
  const height = useAppSelector(state => state.dash.height);
  const flagTotal = useAppSelector(state => state.dash.flagTotal);
  const dispatch = useAppDispatch();

  const hasGameEnded = () => gameOver || tilesNeeded === 0 || width === 0;

  const renderBoard = (board: BoardType):JSX.Element[][] | null => {
    if (board.length === 0) return null;
    console.log('board render');
    return board.map((row, i) => {
      return row.map((box, j) => {
        return <Tile
          key={`${i}-${j}`}
          gameOver={gameOver}
          tilesNeeded={tilesNeeded}
          row={i}
          col={j}
          {...box}
          />
      });
    });
  }

  const clickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let target = e.target as typeof e.target & HTMLDivElement;
    if (hasGameEnded()) return;
    if (target.nodeName === 'I' || target.hasChildNodes()) return;

    let row = parseInt(target.dataset.row as string, 10);
    let col = parseInt(target.dataset.col as string, 10);

    if (board[row][col].isBomb) {
      dispatch(endGame())
    } else if (!board[row][col].revealed) {
      dispatch(reveal({ row, col }));
    }
  }

  const flagHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    let target = e.target as typeof e.target & HTMLDivElement;

    if (hasGameEnded()) return;

    if (target.nodeName === 'I') {
      let parent = target.parentNode as HTMLDivElement;
      let row = parseInt(parent.dataset.row as string, 10);
      let col = parseInt(parent.dataset.col as string, 10);
      dispatch(flag({ row, col }))
    } else {
      let row = parseInt(target.dataset.row as string, 10);
      let col = parseInt(target.dataset.col as string, 10);
      dispatch(flag({ row, col }))
    }

    return false;
  }

  useEffect(() => {
    dispatch(build({
      width: width,
      height: height,
      bombs: flagTotal
    }));
  }, [dispatch, width, height, flagTotal])

  return (
    <div
      onContextMenu={flagHandler}
      onClick={clickHandler}
      className={`board ${difficulty}`}>
      { hasGameEnded() && <div className='gameEnd'></div> }
      {board && renderBoard(board)}
    </div>
  )
}

export default Board;
