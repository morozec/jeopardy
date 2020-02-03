import React from 'react'
import { Link } from 'react-router-dom';

function TopicRow(props) {
    const { topicData } = props;
    const { topic, questions } = topicData;

    const values = [100, 200, 300, 400, 500];

    const valuesCells = values.map((v, index) =>
        <div key={index} className="Cell">
            <Link to={{
                pathname: '/question',
                topic: topic,
                text: questions[index]
            }} >{v}</Link>
        </div>)

    return (
        <div className='TopicRow'>
            <div className="Topic">{topic}</div>
            {valuesCells}
        </div>
    )
}

export default TopicRow;