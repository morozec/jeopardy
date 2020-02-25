import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function Question(props) {
    const { topic, question, answer, isLimitedTime } = props
    const [showAnswer, setShowAnswer] = useState(false)
    const [timeLeft, setTimeLeft] = useState(props.limitedTime)
    const [isPause, setIsPause] = useState(false)

    const timer = () => {
        setTimeLeft(timeLeft - 1)
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            setShowAnswer(true)
            return
        }
        if (isPause) return
        const timedId = setTimeout(timer, 1000)
        return () => clearInterval(timedId)
    }, [timeLeft, isPause])

    const handlePauseClick = () => {
        setIsPause(!isPause)
    }

    return (
        <div className="Question">
            <div>{topic}</div>
            <div>{question}</div>
            {showAnswer ? <div>{answer}</div> : <Button onClick={() => setShowAnswer(true)}>Показать ответ</Button>}
            {isLimitedTime &&
                <div>
                    <label>{`Осталось секунд: ${timeLeft}`}</label>
                    <Button disabled={timeLeft === 0} onClick={handlePauseClick}>{isPause ? 'Продолжить' : 'Пауза'}</Button>
                </div>}
        </div>
    )
}