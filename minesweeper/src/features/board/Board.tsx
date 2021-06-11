import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { build, reveal, BoardType } from './boardSlice';
import './board.css';
const flag = document.createElement('i');
const skull = document.createElement('i');
flag.classList.add('fas', 'fa-flag', 'bad-icons');
skull.classList.add('fas', 'fa-skull-corssbones', 'bad-icons');

const Board = () => {
  const { board } = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  const renderBoard = (board: BoardType):JSX.Element[][] => {
    return board.map((row, i) => {
      return row.map((box, j) => {
        if (box.flag) {
          return <div className='flag' data-row={i} data-col={j}></div>;
        } else if (box.value === -1) {
          return <div className='bomb' data-row={i} data-col={j}></div>;
        } else if (box.revealed) {
          return (
            <div className='reveal' data-row={i} data-col={j}>
              {box.value === 0 ? '' : box.value}
            </div>
          )
        } else {
          return <div className='hidden' data-row={i} data-col={j}></div>
        }
      });
    });
  }

  const clickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let target = e.target as typeof e.target & HTMLDivElement;

    let row = parseInt(target.dataset.row as string, 10);
    let col = parseInt(target.dataset.col as string, 10);
    if (!board[row][col].revealed) {
      dispatch(reveal({ row, col }));
    }
  }

  const flagHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    let target = e.target as typeof e.target & HTMLDivElement;
    console.log(target.nodeName)
    if (target.nodeName === 'DIV') {
      if (target.hasChildNodes()) {
        target.removeChild(flag);
      } else {
        target.appendChild(flag);
      }
    } else if (target.nodeName === 'I' && target.parentNode) {
      target.parentNode.removeChild(target);
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
      {board && renderBoard(board)}
    </div>
  )
}

export default Board;
