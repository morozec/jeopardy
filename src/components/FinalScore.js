import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function FinalScore(props) {

    const { players, updateRound, isFinalRound } = props

    const playersScores = players.map((p, i) => (
        <Fragment key={i}>
            <div className='player-name'>{p.name}</div>
            <div className='player-score'>{p.score}</div>
        </Fragment>
    ))


    return (
        <div className='player-info-container-fs' onClick={updateRound}>
            <div className='player-info-container-fs-grid'>
                {playersScores}
            </div>

            {isFinalRound &&
                <Link className='no-decoration' to={{pathname: '/reg', }}>
                    <Button variant='warning' block>Новая игра</Button>                    
                </Link>}
        </div>
    )

}