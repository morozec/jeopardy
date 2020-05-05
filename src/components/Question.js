import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function Question(props) {
    const { topic, question, answer, limitedTime, goToGameBoard, playersAnswers, isFinalRound } = props
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
        <div className="Question">
            <div>{topic}</div>
            <div>{question}</div>

            <div className={needShowAnswer ? '' : 'question-answer'} onClick={handleAnswerClick}>{ needShowAnswer ? answer : '???'}</div>

            {goToGameBoard && <Button disabled={!needShowAnswer} onClick={() => goToGameBoard()}>Главный экран</Button>}

            {limitedTime !== -1 && timeLeft > 0 && !needShowAnswer &&
                <div>
                    <label>{`Осталось секунд: ${timeLeft}`}</label>
                    <Button disabled={timeLeft === 0} onClick={handlePauseClick}>{isPause ? 'Продолжить' : 'Пауза'}</Button>
                </div>}
        </div>
    )
}