import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { reset } from '../dashboard/dashSlice';
import { endGame } from '../board/boardSlice';
import { postTopEntry } from '../leaders/leadersSlice';
import './endscreen.css'

const EndScreen: React.FC = () => {
    const isHighScore = useAppSelector(state => state.dash.isHighScore);
    const highScore = useAppSelector(state => state.dash.highScore);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useAppDispatch();

    const handleNameSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (name.length !== 3) {
            setMessage('Insert 3 Initials')
        } else {
            dispatch(reset())
            dispatch(endGame())
            if (isHighScore && highScore) {
                dispatch(postTopEntry({
                    name: name,
                    score: highScore?.score,
                    level: highScore?.level,
                }))
            }
        }

    }

    return (
        <div className='end-cover'>
            { isHighScore && highScore &&  (
                    <div className='win-cont'>
                        { message && <div className='win-message'>{message}</div> }
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