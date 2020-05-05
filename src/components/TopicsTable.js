import React from 'react'

export default function TopicsTable(props){
    const { topics, hideAllTopics } = props
  
    return(
        <div className='topics-table' onClick={hideAllTopics}>
            {topics.map((t,i) => <div className='topics-table-cell' key={i}>{t}</div>)}
        </div>
    )
}