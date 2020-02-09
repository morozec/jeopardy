import React from 'react'

export default function Question(props){
    const {topic, text, value, players, handlePlayerAnswer} = props.location


    const playersActions = players.map((p, i) => (
        <div key={i} className='player-action'>
            <div>{p.name}</div>
            <div className='pa-button' onClick={() => handlePlayerAnswer(i, value)}>Right</div>
            <div className='pa-button' onClick={() => handlePlayerAnswer(i, value)}>Wrong</div>
        </div>
    ))

    return (
        <div className="Question">
            <div className='question-topic'>{topic}</div>
            <div className='question-text'>{text}</div>
            <div className='player-action-container'>
                {playersActions}
            </div>
        </div>
    )
}