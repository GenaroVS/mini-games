import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './endscreen.css'

interface props {
    gameOver: boolean;
    gameWon: boolean;
    width: number;
}

const EndScreen: React.FC<props> = ({ gameOver, gameWon, width }) => {
    const isHighScore = useAppSelector(state => state.dash.isHighScore);
    const highScore = useAppSelector(state => state.dash.highScore);
    const hasGameEnded = () => gameOver || gameWon || width === 0;
    console.log('isHighScore: ' + isHighScore);
    console.dir(highScore);
    if (!hasGameEnded()) return null;

    return (
        <div className='game-end'>

        </div>
    );
};

export default EndScreen;