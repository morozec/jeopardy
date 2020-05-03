import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function FinalScore(props) {

    const { players, updateRound, isFinalRound } = props

    const playersScores = players.map((p, i) => (
        <div key={i} className='player-info'>
            <div>{p.name}</div>
            <div className='player-score'>{p.score}</div>
        </div>
    ))


    return (
        <div className='player-info-container-fs' onClick={updateRound}>
            {playersScores}
            {isFinalRound &&
                <Link to={{pathname: '/reg', }}>
                    <Button>Новая игра</Button>                    
                </Link>}
        </div>
    )

}