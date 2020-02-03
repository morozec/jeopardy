import React from 'react'
import TopicRow from './TopicRow';

function Gameboard() {


    const topics = [1, 2, 3, 4, 5];
    const topicsRows = topics.map(t => <TopicRow topic={t} />)
    // const values = [100, 200, 300, 400, 500];

    // const listItems = topics.map((q, index) =>
    //     <li>{values[index]}-{q}</li>)

    return (
        <div className='Gameboard' >
            {topicsRows}
        </div>
    )
}

export default Gameboard;