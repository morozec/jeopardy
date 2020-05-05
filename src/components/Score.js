import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

export default function Score(props) {

    const { players, canAnswer, handlePlayerAnswer, playersAnswers, changeScore, setShowFinalScore, questionValue } = props
    const [editingScore, setEditingScore] = useState(0);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [showEditScore, setShowEditScore] = useState(false);

    const handleStartEdit = (score, index) => {
        setEditingScore(score);
        setEditingIndex(index);
        setShowEditScore(true);
    }
   
    const playersScores = players.map((p, i) => (
        <div key={i} className={`player-info ${p.isActive ? 'is-current' : ''}`}>

            <div className='player-name'>{p.name}</div>

            {canAnswer && <Button
                className='btn btn-danger rounded-circle change-score-button'
                disabled={playersAnswers[i] !== 0 || playersAnswers.some(a => a === 1)}
                onClick={() => handlePlayerAnswer(i, false, questionValue)}
            >
                <strong>-</strong>
            </Button>}

            <div className='player-score pointer' onClick={() => handleStartEdit(p.score, i)}>{p.score}</div>

            {canAnswer && <Button
                className='btn btn-warning rounded-circle change-score-button'
                disabled={playersAnswers[i] !== 0 || playersAnswers.some(a => a === 1)}
                onClick={() => handlePlayerAnswer(i, true, questionValue)}
            >
                <strong>+</strong>
            </Button>}

        </div>
    ))

    const handleHideEditScore = () => setShowEditScore(false);

    const handleEditingScoreLoad = () => {
        const editingScore = document.getElementById('editing-score');
        editingScore.select();
    }

    const handleEditScore = () => {
        changeScore(editingIndex, editingScore);
        setShowEditScore(false);
    }


    return (
        <div className='player-info-container'>
            {playersScores}
            <Button variant='danger' onClick={() => setShowFinalScore(true)}>Закончить раунд</Button>

            <Modal show={showEditScore} onHide={handleHideEditScore} centered onShow={handleEditingScoreLoad}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение счета</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control id='editing-score' type="number"
                        value={editingScore} onChange={(e) => setEditingScore(+e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleEditScore}>
                        Принять
                        </Button>
                    <Button variant="secondary" onClick={handleHideEditScore}>
                        Отмена
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}