import React, { useState, useEffect } from 'react'
import { getAllPlayers, Rank } from './leadersSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './leaders.css'

const open: React.MouseEventHandler<HTMLElement> = (e) => {
    let cont = document.querySelector('.leaders-cont');
    cont?.classList.toggle('active');
}

const LeaderBoard = () => {
    const [level, setLevel] = useState('beginner');
    const rankings = useAppSelector(state => state.leaders);
    const dispatch = useAppDispatch();

    const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        let target = e.target as typeof e.target & HTMLOptionElement;
        setLevel(target.value);
    }

    const renderRankings = (rankings: Rank[]): JSX.Element[] | JSX.Element => {
        if (rankings.length === 0) {
            return <div>Error, No rankings found</div>;
        }

        return rankings.map((rank, i) => {
            return (
                <li key={i} className='rank'>
                    <div className='rank-info'>
                        <div>{(i + 1) + ' ' + rank.name}</div>
                        <div>{rank.score}</div>
                    </div>
                    <div className='rank-date'>{rank.date}</div>
                </li>
            )
        });
    }

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch]);

    return (
        <>
            <div className='leaders-cont'>
                <h2 className='leaders-header'>Rankings</h2>
                <select className='leaders-select' value={level} onChange={handleSelect}>
                    <option value='beginner'>Beginner</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='expert'>Expert</option>
                </select>
                <ul className='rankings'>
                    <li className='labels'>
                        <div>Player</div>
                        <div>Score</div>
                    </li>
                    { renderRankings(rankings[level]) }
                </ul>
            </div>
            <i onClick={open} className="fas fa-gem"></i>
        </>
    )
}

export default LeaderBoard;