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
    if (isBomb) {
      return (
        <div className='tile reveal' data-row={row} data-col={col}>
          <i className='fas fa-skull-crossbones bad-icons'></i>
        </div>
      )
    } else {
      return (
        <div className='tile reveal' data-row={row} data-col={col}>
          {value === 0 ? '' : value}
        </div>
      )
    }
  } else if (revealed) {
    return (
      <div className='tile reveal' data-row={row} data-col={col}>
        {value === 0 ? '' : value}
      </div>
    )
  }
  return (
    <div className='tile hidden' data-row={row} data-col={col}>
      { flagged &&  <i className='fas fa-flag bad-icons'></i> }
    </div>
  )
};

export default Tile;