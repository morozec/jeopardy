import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

export default function Question(props){
    const {topic, question, answer} = props
    const [showAnswer, setShowAnswer] = useState(false)

    return (
        <div className="Question">
            <div>{topic}</div>
            <div>{question}</div>   
            {showAnswer ? <div>{answer}</div> : <Button onClick={() => setShowAnswer(true)}>Показать ответ</Button>}     
        </div>
    )
}