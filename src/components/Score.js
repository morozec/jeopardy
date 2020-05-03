import React, { useState } from 'react'

import correctImg from './../img/correct.png'
import wrongImg from './../img/wrong.png'
import { Button } from 'react-bootstrap'

export default function Score(props) {

    const { players, selectedQuestionIndex, handlePlayerAnswer, playersAnswers, changeScore, setShowFinalScore } = props
    const [isEditMode, setIsEditMode] = useState(new Array(players.length).fill(0))
    const [editingScore, setEditingScore] = useState(0)

    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyDown, false)
    //     return () => document.removeEventListener('keydown', handleKeyDown, false)
    // }, [])

    const handleEdit = (e) => {        
        setEditingScore(+e.target.value)
    }

    const handleStartEdit = (score, index) => {
        setEditingScore(score)

        const newIsEditMode = Object.assign([], isEditMode)
        newIsEditMode[index] = 1
        setIsEditMode(newIsEditMode)
    }

    const finishScoreChange = (index, isAccept) =>{
        if (isAccept) changeScore(index, editingScore)
        setIsEditMode(new Array(players.length).fill(0))
    }

    const handleKeyDown = (e, index) =>{
        if (e.key === 'Escape') finishScoreChange(index, false)
        else if (e.key === 'Enter') finishScoreChange(index, true)
    }

    const playersScores = players.map((p, i) => (
        <div key={i} className={`player-info ${p.isActive ? 'is-current' : ''}`} onKeyDown={(e) => handleKeyDown(e, i)}>

            {selectedQuestionIndex !== -1 && <img src={wrongImg} alt='wrong'
                className={`pa-button ${playersAnswers[i] !== 0 || playersAnswers.some(a => a === 1) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, false)} />}

            <div>{p.name}</div>
            {isEditMode[i]===0 && <div className='player-score' onDoubleClick={() => handleStartEdit(p.score, i)}>{p.score}</div>}
            {isEditMode[i]===1 && <input type="text" value={editingScore} onChange={handleEdit} autoFocus/>}
            {isEditMode[i]===1 && <Button onClick={() => finishScoreChange(i, true)}>Ok</Button>}
            {isEditMode[i]===1 && <Button onClick={() => finishScoreChange(i, false)}>Отмена</Button>}

            {selectedQuestionIndex !== -1 && <img src={correctImg} alt='correct'
                className={`pa-button ${playersAnswers[i] !== 0 || playersAnswers.some(a => a === 1) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, true)} />}

        </div>
    ))


    return (
        <div className='player-info-container'>
            {playersScores}
            <Button variant='secondary' onClick={() => setShowFinalScore(true)}>Закончить раунд</Button>
        </div>
    )
}