import React from 'react'

export default function TopicsTable(props){
    console.log(props)
    const { topics, hideAllTopics } = props
  
    return(
        <div className='topics-grid' onClick={hideAllTopics}>
            {topics.map((t,i) => <div className='topics-grid-cell' key={i}>{t}</div>)}
        </div>
    )
}