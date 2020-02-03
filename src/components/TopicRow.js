import React from 'react'

function TopicRow(props){
    const {topic} = props;
    const values = [100, 200, 300, 400, 500];
    const valuesCells = values.map(v => <div className="Cell">{v}!</div>)

    return(
        <div className='TopicRow'>
            <div className="Topic">{topic}...</div>
            {valuesCells}
        </div>
    )
}

export default TopicRow;