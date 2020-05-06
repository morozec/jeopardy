import React from 'react'

function TopicRow(props) {
    const { topicIndex, topic, handleQuestionSelect, rowPlayedQuestions, values, round } = props;

    const valuesCells = values.map((v, questionIndex) =>
        rowPlayedQuestions[questionIndex] !== 1 ?
            <div key={questionIndex} className="cell-value pointer" onClick={() => handleQuestionSelect(topicIndex, questionIndex)}>
                {v * round}
            </div> :
            <div key={questionIndex} className="cell-empty"></div>)

    return (
        <div className='topicRow'>
            <div className="topicName">{topic.name}</div>
            {valuesCells}
        </div>
    )
}

export default TopicRow;