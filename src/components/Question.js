import React, { useState, useEffect } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'

export default function Question(props) {
    const { question, answer, limitedTime, goToGameBoard, playersAnswers, isFinalRound } = props
    const [showAnswer, setShowAnswer] = useState(false)
    const [timeLeft, setTimeLeft] = useState(limitedTime)
    const [isPause, setIsPause] = useState(false)


    const needShowAnswer = showAnswer || playersAnswers.some(a => a === 1)

    useEffect(() => {
        if (needShowAnswer) return;
        if (timeLeft <= 0) return;

        if (isPause) return;
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, isPause, needShowAnswer, isFinalRound])

    const handlePauseClick = () => {
        setIsPause(!isPause)
    }

    const handleAnswerClick = () => {
        if (showAnswer) return
        setShowAnswer(true)
    }


    return (
        <div className="question">
            <div className='question-title'>{question}</div>

            <div className={`answer ${!needShowAnswer ? 'hidden' : ''}`}>{answer}</div>

            {limitedTime !== -1 &&
                <ProgressBar animated variant='danger' className='pointer'
                    now={limitedTime - timeLeft} min={0} max={limitedTime}
                    onClick={handlePauseClick}
                />
            }

            {!needShowAnswer && <Button variant='warning' block onClick={handleAnswerClick}>Показать ответ</Button>}
            {needShowAnswer && goToGameBoard && <Button variant='warning' block onClick={() => goToGameBoard()}>Главный экран</Button>}

        </div>
    )
}