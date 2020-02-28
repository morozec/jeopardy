import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function Question(props) {
    const { topic, question, answer, isLimitedTime, goToGameBoard, playersAnswers } = props
    const [showAnswer, setShowAnswer] = useState(false)
    const [timeLeft, setTimeLeft] = useState(props.limitedTime)
    const [isPause, setIsPause] = useState(false)


    useEffect(() => {
        if (timeLeft <= 0) {
            setShowAnswer(true)
            return
        }
        if (isPause) return
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        return () => clearInterval(timerId)
    }, [timeLeft, isPause])

    const handlePauseClick = () => {
        setIsPause(!isPause)
    }

    const handleAnswerClick = () => {
        if (showAnswer) return
        setShowAnswer(true)
    }

    const needShowAnswer = showAnswer || playersAnswers.some(a => a === 1)

    return (
        <div className="Question">
            <div>{topic}</div>
            <div>{question}</div>

            <div className={needShowAnswer ? '' : 'question-answer'} onClick={handleAnswerClick}>{ needShowAnswer ? answer : '???'}</div>

            {/* {showAnswer || playersAnswers.some(a => a === 1) ? <div>{answer}</div> : <Button onClick={() => setShowAnswer(true)}>Показать ответ</Button>} */}
            <Button disabled={!needShowAnswer} onClick={() => goToGameBoard()}>Главный экран</Button>

            {isLimitedTime &&
                <div>
                    <label>{`Осталось секунд: ${timeLeft}`}</label>
                    <Button disabled={timeLeft === 0} onClick={handlePauseClick}>{isPause ? 'Продолжить' : 'Пауза'}</Button>
                </div>}
        </div>
    )
}