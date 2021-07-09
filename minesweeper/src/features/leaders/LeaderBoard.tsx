import React, { useState } from 'react'
import './leaders.css'

export type Rank = {
    name: string;
    score: number;
    date: string;
}

const open: React.MouseEventHandler<HTMLElement> = (e) => {
    let target = e.target as typeof e.target & HTMLElement;
    let cont = document.querySelector('.leaders-cont');
    cont?.classList.toggle('active');
}

let data: Rank[] = [
    {
        'name': 'GVS',
        'score': 100,
        'date': '02-02-2020'
    },
    {
        'name': 'AAS',
        'score': 200,
        'date': '02-09-2020'
    },
    {
        'name': 'NGS',
        'score': 70,
        'date': '02-10-2020'
    },
    {
        'name': 'GVS',
        'score': 100,
        'date': '02-02-2020'
    },
    {
        'name': 'AAS',
        'score': 200,
        'date': '02-09-2020'
    },
    {
        'name': 'NGS',
        'score': 70,
        'date': '02-10-2020'
    },
    {
        'name': 'GVS',
        'score': 100,
        'date': '02-02-2020'
    },
    {
        'name': 'AAS',
        'score': 200,
        'date': '02-09-2020'
    },
    {
        'name': 'NGS',
        'score': 70,
        'date': '02-10-2020'
    },
    {
        'name': 'GVS',
        'score': 100,
        'date': '02-02-2020'
    },
    {
        'name': 'AAS',
        'score': 200,
        'date': '02-09-2020'
    },
    {
        'name': 'NGS',
        'score': 70,
        'date': '02-10-2020'
    }
]

const LeaderBoard = () => {
    const [level, setLevel] = useState('Beginner')

    const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        let target = e.target as typeof e.target & HTMLOptionElement
        setLevel(target.value);
    }

    const renderRankings = (rankings: Rank[]): JSX.Element[] | JSX.Element => {
        if (rankings.length === 0) {
            return <div>Error, No rankings found</div>;
        }

        return rankings.map((rank, i) => {
            return (
                <li className='rank'>
                    <div className='rank-info'>
                        <div>{(i + 1) + ' ' + rank.name}</div>
                        <div>{rank.score}</div>
                    </div>
                    <div className='rank-date'>{rank.date}</div>
                </li>
            )
        });
    }

    return (
        <>
            <div className='leaders-cont'>
                <h2 className='leaders-header'>Rankings</h2>
                <select className='leaders-select' value={level} onChange={handleSelect}>
                    <option value='Beginner'>Beginner</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Expert'>Expert</option>
                </select>
                <ul className='rankings'>
                    <li className='labels'>
                        <div>Player</div>
                        <div>Score</div>
                    </li>
                    {renderRankings(data)}
                </ul>
            </div>
            <i onClick={open} className="fas fa-gem"></i>
        </>
    )
}

export default LeaderBoard;