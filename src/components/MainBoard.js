import React, { useState, useEffect } from 'react'
import Player from '../data/Players';
import TopicsTable from './TopicsTable';
import Round from './Round';
import GameBoard from './GameBoard'
import { parseDb } from './../services/parsers';

function MainBoard(props) {

    const { playersNames, selectedPackage, isLimitedTime, limitedTime, userFile } = props.location

    const [players, setPlayers] = useState(() => playersNames ? playersNames.map((pn, i) => new Player(pn, 0, i === 0)) : [])

    const [isLoading, setIsLoading] = useState(false)
    const [questionsPackage, setQuestionsPackage] = useState(null)

    const [showAllTopics, setShowAllTopics] = useState(false)

    const [round, setRound] = useState(1)
    const [showRound, setShowRound] = useState(false)

    let topics = questionsPackage
        ? questionsPackage.rounds.map(r => r.topics).reduce((res, cur) => [...res, ...cur], []).map(topic => topic.name)
        : [];


    const ROUNDS_COUNT = 3
    const SHOW_ROUND_TIME = 1000

    const hideAllTopics = () => {
        setShowAllTopics(false)
        setShowRound(true)
        setTimeout(() => {
            setShowRound(false)
        }, 1000)
    }


    useEffect(() => {
        if (userFile) {//загрузка из своего файла

            var reader = new FileReader();
            reader.readAsText(userFile);

            reader.onload = (ev) => {
                setQuestionsPackage(JSON.parse(ev.target.result));
                setShowAllTopics(true);
            }
           
            return;
        }

        if (!selectedPackage) return;

        setIsLoading(true)
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const packageApi = 'http://api.baza-voprosov.ru/packages/';
        fetch(`${corsProxy}${packageApi}${selectedPackage.id}`)
            .then(response => response.json())
            .then(pack => {

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

    }, [userFile, selectedPackage])

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
                        roundData={questionsPackage.rounds[round-1]}
                        updateRound={updateRound}
                        isLimitedTime={isLimitedTime}
                        limitedTime={limitedTime}
                    />

    )
}

export default MainBoard;