import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Question from './Question';
import { FINAL_ROUND_TIME_SECS } from '../helpers/constants';

export default function FinalRound(props) {
    const { finalRoundData } = props;
    const [questions, setQuestions] = useState([...finalRoundData.questions]);
    const [finalQuestion, setFinalQuestion] = useState(null)

    const handleTopicClick = (id) => {
        if (questions.length === 1){
            setFinalQuestion(questions[0]);
        }
        setQuestions(questions.filter(q => q.id !== id));
    }

    const topics = questions.map(q => (
        <Button key={q.id} block className='final-round-topics' onClick={() => handleTopicClick(q.id)}>{q.topicName}</Button>
    ))

    return (
        <Container className='final-round-topics-container'>
            {!finalQuestion && topics}
            {finalQuestion && <Question
                topicName={finalQuestion.topicName}
                question={finalQuestion.question}
                answer={finalQuestion.answer}
                isLimitedTime={true}
                limitedTime={FINAL_ROUND_TIME_SECS}
                playersAnswers={[]}
            />}
        </Container>
    )
}