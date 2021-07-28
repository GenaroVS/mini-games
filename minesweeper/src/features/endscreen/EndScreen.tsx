import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { reset } from '../dashboard/dashSlice';
import { postTopEntry } from '../leaders/leadersSlice';
import './endscreen.css'

const EndScreen: React.FC = () => {
    const isHighScore = useAppSelector(state => state.dash.isHighScore);
    const highScore = useAppSelector(state => state.dash.highScore);
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();

    const handleNameSubmit:React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        if (name.length < 3) return;

        if (isHighScore && highScore) {
            try {
                let result = await dispatch(postTopEntry({
                    name: name,
                    score: highScore?.score,
                    level: highScore?.level,
                }));
                unwrapResult(result);
                dispatch(reset());
            } catch(err) {
                console.log(err);
            }
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