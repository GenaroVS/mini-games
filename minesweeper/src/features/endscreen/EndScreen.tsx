import React, { useState } from 'react';
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
    const [name, setName] = useState('');
    const hasGameEnded = () => gameOver || gameWon || width === 0;

    const handleNameSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (name.length !== 3) {
            return;
        }

    }

    if (!hasGameEnded()) return null;

    return (
        <div className='end-cover'>
            { gameWon && isHighScore && highScore &&  (
                    <div className='win-cont'>
                        <div className='win-info'>
                            <input name='win-name' value={name} onChange={(e) => setName(e.target.value.toUpperCase())}></input>
                            <span>{`Score: ${highScore.score}`}</span>
                        </div>
                        <button onClick={handleNameSubmit} className='win-btn'>Submit Entry</button>
                    </div>
                )
            }
        </div>
    );
};

export default EndScreen;