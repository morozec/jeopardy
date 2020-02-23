import React, { useState, useEffect } from 'react'
import Player from '../data/Players';
import TopicsTable from './TopicsTable';
import Round from './Round';
import GameBoard from './GameBoard'

function MainBoard(props) {

    const { playersNames, packageId } = props.location
    // console.log(packageId)

    const [players, setPlayers] = useState(() => playersNames ? playersNames.map((pn, i) => new Player(pn, 0, i === 0)) : [])

    const [isLoading, setIsLoading] = useState(false)
    const [topics, setTopics] = useState([])
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    const [showAllTopics, setShowAllTopics] = useState(false)

    const [round, setRound] = useState(0)
    const [showRound, setShowRound] = useState(false)

    const TOPICS_COUNT = 18
    const SHOW_ROUND_TIME = 1000
    const SHOW_ALL_TOPICS_TIME = 1000
    

    useEffect(() => {
        if (!packageId) return

        setIsLoading(true)
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const packageApi = 'http://api.baza-voprosov.ru/packages/';
        fetch(`${corsProxy}${packageApi}${packageId}`)
            .then(response => response.json())
            .then(pack => {
                const data = pack.tours[0].questions.slice(0, TOPICS_COUNT)
                const topics = data.map(d => d.question.split('\n ')[0])
                // console.log(topics)
                const questions = data.map(d => d.question.split('\n ').slice(1))
                // console.log(questions)
                const answers = data.map(d => d.answer.split('\n '))
                // console.log(answers)

                setTopics(topics)
                setQuestions(questions)
                setAnswers(answers)

                setShowAllTopics(true)
                setTimeout(() => {
                    setShowAllTopics(false)

                    setRound(1)
                    setShowRound(true)

                    setTimeout(() => {
                        setShowRound(false)
                    }, SHOW_ROUND_TIME)
                }, SHOW_ALL_TOPICS_TIME)
            })
            .finally(() => setIsLoading(false))

    }, [packageId])

    if (!playersNames) {
        props.history.push('/reg')
        return null
    }

    const updateScore = (playerIndex, addScore, isCorrect) => {
        const newPlayers = Object.assign([], players)
        if (isCorrect) {
            newPlayers[playerIndex].score += addScore
            newPlayers[playerIndex].isActive = true
        } else {
            newPlayers[playerIndex].score -= addScore
        }
        setPlayers(newPlayers)
    }

    return (

        isLoading ?
            <div>Loading...</div> :
            showAllTopics ?
                <TopicsTable topics={topics} /> :

                showRound ?
                    <Round round={round} /> :
                    <GameBoard
                        players={players}
                        topics={topics}
                        questions={questions}
                        answers={answers}
                        updateScore={updateScore}
                        round={round}
                    />

    )
}

export default MainBoard;