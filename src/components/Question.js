import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function Question(props) {
    const { topic, question, answer, isLimitedTime, isQuestionAnswered } = props
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

    return (
        <div className="Question">
            <div>{topic}</div>
            <div>{question}</div>
            {showAnswer || isQuestionAnswered ? <div>{answer}</div> : <Button onClick={() => setShowAnswer(true)}>Показать ответ</Button>}
            {isLimitedTime &&
                <div>
                    <label>{`Осталось секунд: ${timeLeft}`}</label>
                    <Button disabled={timeLeft === 0} onClick={handlePauseClick}>{isPause ? 'Продолжить' : 'Пауза'}</Button>
                </div>}
        </div>
    )
}