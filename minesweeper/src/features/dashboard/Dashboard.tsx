import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setDifficulty, tick, reset } from './dashSlice';
import './dashboard.css';

export let timer:NodeJS.Timeout;

const DashBoard = () => {
  console.log('dash render');
  const gameOver = useAppSelector(state => state.board.gameOver);
  const tilesNeeded = useAppSelector(state => state.board.tilesNeeded);
  const isPlaying  = useAppSelector(state => state.dash.isPlaying);
  const flags  = useAppSelector(state => state.board.flags);
  const clock  = useAppSelector(state => state.dash.clock);
  const dispatch = useAppDispatch();

  const selectDifficulty: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    let target = e.target as typeof e.target & HTMLButtonElement;
    dispatch(setDifficulty(target.value));

    timer = setInterval(() => {
      dispatch(tick());
    }, 1000)
  }

  const resetHandler = (e?: React.SyntheticEvent): void => {
    if (timer) {
      clearInterval(timer);
    }
    dispatch(reset());
  }

  if (gameOver || tilesNeeded === 0) {
    clearInterval(timer);
  }

  if (isPlaying) {
    return (
      <div className='dashboard playing'>
        <div className='dash-flag'>
          <i className='fas fa-flag bad-icons'></i>
          <span>{flags}</span>
        </div>
        <button onClick={resetHandler}>Reset</button>
        <div>{`Time: ${clock}`}</div>
      </div>
    )

  }

  return (
    <div className='dashboard start'>
      <button
        onClick={selectDifficulty}
        autoFocus
        type='button'
        value='beginner'>
        Beginner
      </button>
      <button
        onClick={selectDifficulty}
        type='button'
        value='intermediate'>
        Intermediate
      </button>
      <button
        onClick={selectDifficulty}
        type='button'
        value='expert'>
        Expert
      </button>
    </div>
  )
};

export default DashBoard;