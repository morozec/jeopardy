import React, { useState, useEffect } from 'react'
import Player from '../data/Players';
import TopicsTable from './TopicsTable';
import Round from './Round';
import GameBoard from './GameBoard'
import Loading from './Loading';
import { parseDb } from '../helpers/parsers';
import { ROUNDS_COUNT, SHOW_ROUND_TIME_MSECS, corsProxy, packageApi } from './../helpers/constants'
import FinalRound from './FinalRound';
import FinalScore from './FinalScore';

function MainBoard(props) {

    const { playersNames, selectedPackage, isLimitedTime, limitedTime, userFile } = props.location

    const [players, setPlayers] = useState(() => playersNames ? playersNames.map((pn, i) => new Player(pn, 0, i === 0)) : [])

    const [isLoading, setIsLoading] = useState(false)
    const [questionsPackage, setQuestionsPackage] = useState(null)

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

        isLoading || !questionsPackage
            ? <Loading />
            : showAllTopics

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