import React from 'react'

export default function FinalScore(props) {
   
    const { players, updateRound } = props

    const playersScores = players.map((p, i) => (
        <div key={i} className='player-info'>            
            <div>{p.name}</div>
            <div className='player-score'>{p.score}</div>
        </div>
    ))


    return (
        <div className='player-info-container-fs' onClick={updateRound}>
            {playersScores}
        </div>
    )

}