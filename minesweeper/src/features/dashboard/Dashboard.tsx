import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setLevel, tick, reset, setHighScore, selectDashAttri } from './dashSlice';
import { selectRankings } from '../leaders/leadersSlice';
import { main_theme, playTempSound, win_sound } from '../soundtrack/soundtrack';
import './dashboard.css';

export let timer:NodeJS.Timeout;

const DashBoard = () => {
  const gameOver = useAppSelector(state => state.board.gameOver);
  const tilesNeeded = useAppSelector(state => state.board.tilesNeeded);
  const flags = useAppSelector(state => state.board.flags);
  const { isPlaying, clock, level } = useAppSelector(selectDashAttri);
  const leaders = useAppSelector(selectRankings);
  const dispatch = useAppDispatch();

  const selectLevel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    let target = e.target as typeof e.target & HTMLButtonElement;
    dispatch(setLevel(target.value));

    timer = setInterval(() => {
      dispatch(tick());
    }, 1000)
  }

  const resetHandler = (e?: React.SyntheticEvent): void => {
    if (timer) clearInterval(timer);
    dispatch(reset());
  }

  useEffect(() => {
    if (gameOver && tilesNeeded === 0) {
      if (tilesNeeded === 0) {
        playTempSound(win_sound, main_theme)
        dispatch(setHighScore({ score: clock, level, rankings: leaders[level] }));
      }
      clearInterval(timer);
    }
  }, [dispatch, gameOver, tilesNeeded, clock, level, leaders])


  if (isPlaying) {
    return (
      <div className='dashboard playing'>
        <div className='dash-flag'>
          <span>{flags}</span>
          <i className='fas fa-flag bad-icons'></i>
        </div>
        <button className='reset-Btn' onClick={resetHandler}>Reset</button>
        <div className='timer'>{`Time: ${clock}`}</div>
      </div>
    )

  }

  return (
    <div className='dashboard start'>
      <button
        onClick={selectLevel}
        autoFocus
        type='button'
        className='level'
        value='beginner'>
        Beginner
      </button>
      <button
        onClick={selectLevel}
        type='button'
        className='level'
        value='intermediate'>
        Intermediate
      </button>
      <button
        onClick={selectLevel}
        type='button'
        className='level'
        value='expert'>
        Expert
      </button>
    </div>
  )
};

export default DashBoard;