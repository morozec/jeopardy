import React from 'react'

function TopicRow(props) {
    const { topicIndex, topic, handleQuestionSelect, rowPlayedQuestions, values } = props;

    const valuesCells = values.map((v, questionIndex) =>
        rowPlayedQuestions[questionIndex] !== 1 ?
            <div key={questionIndex} className="cell-value" onClick={() => handleQuestionSelect(topicIndex, questionIndex)}>
                {v}
            </div> :
            <div key={questionIndex} className="cell-empty"></div>)

    return (
        <div className='TopicRow'>
            <div className="Topic">{topic}</div>
            {valuesCells}
        </div>
    )
}

export default TopicRow;