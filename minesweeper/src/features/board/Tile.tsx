import React from 'react';
import './board.css';
import { TileType } from './boardSlice';

type propTypes = TileType & {
  gameOver: boolean;
  tilesNeeded: number;
  row: number;
  col: number;
};

const Tile = ({
  isBomb,
  revealed,
  flagged,
  value,
  gameOver,
  tilesNeeded,
  row,
  col
}: propTypes) => {

  if (gameOver || tilesNeeded === 0) {
    if (gameOver && isBomb) {
      return (
        <div className='tile land' data-row={row} data-col={col}>
          <i className="fas fa-fire bad-icons"></i>
        </div>
      )
    } else if (tilesNeeded === 0 && isBomb) {
      return (
        <div className='tile land' data-row={row} data-col={col}>
          <i className="fas fa-campground good-icons"></i>
        </div>
      )
    }

    if (value === 0) {
      return <div className='tile ocean' data-row={row} data-col={col}></div>
    } else if (value > 0) {
      return <div className='tile land' data-row={row} data-col={col}>{value}</div>
    }
  }

  if (revealed && value === 0) {
    return <div className='tile ocean' data-row={row} data-col={col}></div>
  } else if (revealed) {
    return <div className='tile land' data-row={row} data-col={col}>{value}</div>
  }

  return (
    <div className='tile hidden' data-row={row} data-col={col}>
      { flagged &&  <i className='fas fa-flag bad-icons'></i> }
    </div>
  )
};

export default Tile;