import React from 'react'

function TopicRow(props) {
    const { topic, questions, handleQuestionSelect } = props;

    const values = [100, 200, 300, 400, 500];

    const valuesCells = values.map((v, index) =>
        <div key={index} className="Cell" onClick={() => handleQuestionSelect(topic, questions[index], values[index])}>
            {v}

            {/* <Link to={{
                pathname: '/question',
                topic: topic,
                text: questions[index],
                value: values[index],
                players: players,
                handlePlayerAnswer : handlePlayerAnswer
            }} >{v}</Link> */}
        </div>)

    return (
        <div className='TopicRow'>
            <div className="Topic">{topic}</div>
            {valuesCells}
        </div>
    )
}

export default TopicRow;