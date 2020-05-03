import React from 'react';
import { Button, Container } from 'react-bootstrap';

export default function FinalRoundTopics(props){
    const {finalRoundData} = props;

    const topics = finalRoundData.questions.map(q => (
        <Button key={q.id} block>{q.topicName}</Button>
    ))

    return (
        <Container>
            {topics}
        </Container>
    )
}