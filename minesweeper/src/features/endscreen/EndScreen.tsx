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
    const dispatch = useAppDispatch();

    const handleNameSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (name.length < 3) return;

        dispatch(reset());
        dispatch(endGame());
        if (isHighScore && highScore) {
            dispatch(postTopEntry({
                name: name,
                score: highScore?.score,
                level: highScore?.level,
            }))
        }
    }

    const handleNameChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let name = e.target.value.toUpperCase();
        if (name.length > 3) name = name.slice(0, 3);
        setName(name)
    }

    return (
        <div className='end-cover'>
            { isHighScore && highScore &&  (
                    <div className='win-cont'>
                        <div className='win-info'>
                            <input name='win-name' value={name} onChange={handleNameChange}></input>
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