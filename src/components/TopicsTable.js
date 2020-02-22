import React, {useEffect, useState} from 'react'

export default function TopicsTable(props){
    const { packageId } = props.location
    const [isLoading, setIsLoading] = useState(false)
    const [topics, setTopics] = useState([])

    useEffect(() => {
        if (!packageId) return

        setIsLoading(true)
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const packageApi = 'http://api.baza-voprosov.ru/packages/';
        fetch(`${corsProxy}${packageApi}${packageId}`)
            .then(response => response.json())
            .then(pack => {
                const data = pack.tours[0].questions
                const dataTopics = data.map(d => d.question.split('\n ')[0]).slice(0, 18)      
                console.log(dataTopics) 
                setTopics(dataTopics)     
                
                setTimeout(() => {
                    props.history.push('/')
                }, 5000)
            })
            .finally(() => setIsLoading(false))

    }, [packageId])

    const topicsGrid = (
        <div className='topics-grid'>
            {topics.map((t,i) => <div className='topics-grid-cell' key={i}>{t}</div>)}
        </div>
    )

    return(
        isLoading ? <div>Loading...</div> : topicsGrid
    )
}