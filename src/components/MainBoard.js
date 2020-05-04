import React, { useState } from 'react'
import Player from '../data/Players';
import TopicsTable from './TopicsTable';
import Round from './Round';
import GameBoard from './GameBoard'

import { ROUNDS_COUNT, SHOW_ROUND_TIME_MSECS } from './../helpers/constants'
import FinalRound from './FinalRound';
import FinalScore from './FinalScore';

function MainBoard(props) {
    
    const { playersNames, isLimitedTime, limitedTime, questionsPackage } = props.location

    const [players, setPlayers] = useState(() => playersNames ? playersNames.map((pn, i) => new Player(pn, 0, i === 0)) : [])

    const [showAllTopics, setShowAllTopics] = useState(false)

    const [round, setRound] = useState(1)
    const [showRound, setShowRound] = useState(false)
    const [showFinalScore, setShowFinalScore] = useState(false);

    let topics = questionsPackage
        ? questionsPackage.rounds.map(r => r.topics).reduce((res, cur) => [...res, ...cur], []).map(topic => topic.name)
        : [];

    const isFinalRound = round === ROUNDS_COUNT + 1 || (questionsPackage && !questionsPackage.finalRound && round === ROUNDS_COUNT);


    const hideAllTopics = () => {
        setShowAllTopics(false)
        setShowRound(true)
        setTimeout(() => {
            setShowRound(false)
        }, SHOW_ROUND_TIME_MSECS)
    }

    const updateRound = () => {
        if (!isFinalRound) {
            setRound(round + 1)
            setShowFinalScore(false)
            setShowRound(true)

            setTimeout(() => {
                setShowRound(false)
            }, SHOW_ROUND_TIME_MSECS)
        }
    }

    if (!playersNames) {
        props.history.push('/reg')
        return null
    }

    const updateScore = (playerIndex, addScore, isCorrect, isSpecialQuestion) => {
        const newPlayers = Object.assign([], players)
        if (isCorrect) {
            newPlayers[playerIndex].score += addScore
        } else {
            newPlayers[playerIndex].score -= addScore;
        }

        if (isCorrect || isSpecialQuestion) {
            for (let i = 0; i < newPlayers.length; ++i) {
                newPlayers[i].isActive = (i === playerIndex)
            }
        }
        setPlayers(newPlayers)
    }

    const changeScore = (playerIndex, newScore) => {
        const newPlayers = Object.assign([], players)
        newPlayers[playerIndex].score = newScore
        setPlayers(newPlayers)
    }

    return (

        showAllTopics

            ? <TopicsTable topics={topics} hideAllTopics={hideAllTopics} />
            : showRound

                ? <Round round={round} />
                : showFinalScore
                    ? <FinalScore players={players} updateRound={updateRound} isFinalRound={isFinalRound} />
                    : round <= ROUNDS_COUNT
                        ? <GameBoard
                            players={players}
                            questionsPackage={questionsPackage}
                            updateScore={updateScore}
                            round={round}
                            roundData={questionsPackage.rounds[round - 1]}
                            isLimitedTime={isLimitedTime}
                            limitedTime={limitedTime}
                            changeScore={changeScore}
                            setShowFinalScore={setShowFinalScore}
                        />
                        : <FinalRound
                            finalRoundData={questionsPackage.finalRound}
                            players={players}
                            changeScore={changeScore}
                            setShowFinalScore={setShowFinalScore} />

    )
}

export default MainBoard;