import React from 'react'

export default function Question(props){
    const {topic, text} = props.location
    return (
        <div className="Question">
            <div>{topic}</div>
            <div>{text}</div>
        </div>
    )
}