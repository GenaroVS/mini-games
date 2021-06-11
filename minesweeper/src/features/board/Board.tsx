import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { build, reveal, endGame, flag, BoardType } from './boardSlice';
import './board.css';
import Tile from './Tile';

const Board = () => {
  const { board, gameOver, tilesNeeded } = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  const renderBoard = (board: BoardType):JSX.Element[][] => {
    return board.map((row, i) => {
      return row.map((box, j) => {
        return <Tile
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
    if (target.classList.contains('gameEnd')) return;
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

    if (target.classList.contains('gameEnd')) return;

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
      width: 10,
      height: 10,
      bombs: 10
    }));
  }, [dispatch])

  return (
    <div
      onContextMenu={flagHandler}
      onClick={clickHandler}
      className='board'>
      { (gameOver || tilesNeeded === 0) && <div className='gameEnd'></div> }
      {board && renderBoard(board)}
    </div>
  )
}

export default Board;
