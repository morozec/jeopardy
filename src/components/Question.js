import React from 'react'

export default function Question(props){
    const {topic, question} = props

    return (
        <div className="Question">
            <div>{topic}</div>
            <div>{question}</div>        
        </div>
    )
}