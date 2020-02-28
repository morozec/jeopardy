import React from 'react'

import correctImg from './../img/correct.png'
import wrongImg from './../img/wrong.png'

export default function Score(props) {

    const { players, selectedQuestionIndex, handlePlayerAnswer, playersAnswers } = props

    const playersScores = players.map((p, i) => (
        <div key={i} className={`player-info ${p.isActive ? 'is-current' : ''}`}>

            {selectedQuestionIndex !== -1 && <img src={wrongImg} alt='wrong'
                className={`pa-button ${playersAnswers[i] !== 0 || playersAnswers.some(a => a === 1) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, false)} />}

            <div>{p.name}</div>
            <div className='player-score'>{p.score}</div>

            {selectedQuestionIndex !== -1 && <img src={correctImg} alt='correct'
                className={`pa-button ${playersAnswers[i] !== 0 || playersAnswers.some(a => a === 1) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, true)} />}

        </div>
    ))


    return (
        <div className='player-info-container'>
            {playersScores}
        </div>
    )
}