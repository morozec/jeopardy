import React, { useState, useEffect } from 'react'
import Player from '../data/Players';
import TopicsTable from './TopicsTable';
import Round from './Round';
import GameBoard from './GameBoard'
import { parseDb } from './../services/parsers';

function MainBoard(props) {

    const { playersNames, packageId, isLimitedTime, limitedTime } = props.location

    const [players, setPlayers] = useState(() => playersNames ? playersNames.map((pn, i) => new Player(pn, 0, i === 0)) : [])

    const [isLoading, setIsLoading] = useState(false)
    // const [topics, setTopics] = useState([])
    // const [questions, setQuestions] = useState([])
    // const [answers, setAnswers] = useState([])
    const [questionsPackage, setQuestionsPackage] = useState(null)

    const [showAllTopics, setShowAllTopics] = useState(false)

    const [round, setRound] = useState(0)
    const [showRound, setShowRound] = useState(false)

    let topics = questionsPackage
        ? questionsPackage.rounds.map(r => r.topics).reduce((res, cur) => [...res, ...cur], []).map(topic => topic.name)
        : [];


    const ROUNDS_COUNT = 3
    const SHOW_ROUND_TIME = 1000

    const hideAllTopics = () => {
        setShowAllTopics(false)
        setRound(1)
        setShowRound(true)
        setTimeout(() => {
            setShowRound(false)
        }, 1000)
    }


    useEffect(() => {
        if (!packageId) return

        setIsLoading(true)
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const packageApi = 'http://api.baza-voprosov.ru/packages/';
        fetch(`${corsProxy}${packageApi}${packageId}`)
            .then(response => response.json())
            .then(pack => {
                // const data = pack.tours[0].questions.slice(0, TOPICS_COUNT)
                // const topics = data.map(d => d.question.split('\n ')[0])
                // const questions = data.map(d => d.question.split('\n ').slice(1))
                // const answers = data.map(d => d.answer.split('\n '))

                // setTopics(topics)
                // setQuestions(questions)
                // setAnswers(answers)


                const qp = parseDb(pack);
                setQuestionsPackage(qp);
                setShowAllTopics(true)

                // setTimeout(() => {
                //     setShowAllTopics(false)

                //     setRound(1)
                //     setShowRound(true)

                //     setTimeout(() => {
                //         setShowRound(false)
                //     }, SHOW_ROUND_TIME)
                // }, SHOW_ALL_TOPICS_TIME)
            })
            .finally(() => setIsLoading(false))

    }, [packageId])

    const updateRound = () => {
        if (round < ROUNDS_COUNT) {
            setRound(round + 1)
            setShowRound(true)

            setTimeout(() => {
                setShowRound(false)
            }, SHOW_ROUND_TIME)
        } else {
            alert('Игра окончена')
        }
    }

    if (!playersNames) {
        props.history.push('/reg')
        return null
    }

    const updateScore = (playerIndex, addScore, isCorrect) => {
        const newPlayers = Object.assign([], players)
        if (isCorrect) {
            newPlayers[playerIndex].score += addScore

            for (let i = 0; i < newPlayers.length; ++i) {
                newPlayers[i].isActive = (i === playerIndex)
            }
        } else {
            newPlayers[playerIndex].score -= addScore
        }
        setPlayers(newPlayers)
    }

    return (

        isLoading || !questionsPackage
            ? <div>Loading...</div>
            : showAllTopics

                ? <TopicsTable topics={topics} hideAllTopics={hideAllTopics} />
                : showRound

                    ? <Round round={round} />
                    : <GameBoard
                        players={players}
                        questionsPackage={questionsPackage}
                        updateScore={updateScore}
                        roundData={questionsPackage.rounds[round]}
                        updateRound={updateRound}
                        isLimitedTime={isLimitedTime}
                        limitedTime={limitedTime}
                    />

    )
}

export default MainBoard;