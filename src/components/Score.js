import React from 'react'

import correctImg from './../img/correct.png'
import wrongImg from './../img/wrong.png'

export default function Score(props) {

    const { players, selectedQuestionIndex, wrongAnswerIndexes, handlePlayerAnswer } = props

    const playersScores = players.map((p, i) => (
        <div key={i} className={`player-info ${p.isActive ? 'is-current' : ''}`}>
            <div>{p.name}</div>
            <div className='player-score'>{p.score}</div>

            {selectedQuestionIndex !== -1 && <img src={correctImg} alt='correct'
                className={`pa-button ${wrongAnswerIndexes.includes(i) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, true)} />}
            {selectedQuestionIndex !== -1 && <img src={wrongImg} alt='wrong'
                className={`pa-button ${wrongAnswerIndexes.includes(i) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, false)} />}
        </div>
    ))


    return (
        <div className='player-info-container'>
            {playersScores}
        </div>
    )
}