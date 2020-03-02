import React, { useState, useEffect } from 'react'
import Question from './Question';
import TopicRow from './TopicRow';
import Score from './Score';
import Topic from './Topic';
import FinalScore from './FinalScore';


export default function GameBoard(props) {
    const TOPICS_TIMER = 1000
    const ROUND_TOPICS_COUNT = 6
    const QUESTIONS_COUNT = 5
    const VALUES = [100, 200, 300, 400, 500]

    const { players, updateScore, round, updateRound, isLimitedTime, limitedTime } = props

    const start = ROUND_TOPICS_COUNT * (round - 1)
    const end = ROUND_TOPICS_COUNT * (round)
    const topics = props.topics.slice(start, end)
    const questions = props.questions.slice(start, end)
    const answers = props.answers.slice(start, end)

    const [showingTopicIndex, setShowingTopicIndex] = useState(0)

    const [playedQuestions, setPlayedQuestions] = useState(
        new Array(ROUND_TOPICS_COUNT).fill(
            new Array(QUESTIONS_COUNT).fill(0)))
    // const [curQuestion, setCurQuestion] = useState(undefined)

    const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1)
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1)

    const [showFinalScore, setShowFinalScore] = useState(false)

    //ответы игроков на текущий вопрос. 0 - не давал ответа, -1 - неправильный ответ, 1 - правильный ответ
    const [playersAnswers, setPlayersAnswers] = useState(new Array(players.length).fill(0))

    useEffect(() => {
        if (showingTopicIndex === topics.length || showingTopicIndex === -1) {
            setShowingTopicIndex(-1)
            return
        }
        const timerId = setTimeout(() => setShowingTopicIndex(showingTopicIndex + 1), TOPICS_TIMER)
        return () => clearInterval(timerId)

    }, [showingTopicIndex, topics.length])

    const handleQuestionSelect = (topicIndex, questionIndex) => {
        setSelectedTopicIndex(topicIndex)
        setSelectedQuestionIndex(questionIndex)

        if (topicIndex === -1 && questionIndex === -1) { //вернулись на главный экран
            setPlayersAnswers(new Array(players.length).fill(0))

            const newPlayedQuestions = playedQuestions.map((row) => row.slice()) //full copy
            newPlayedQuestions[selectedTopicIndex][selectedQuestionIndex] = 1
            setPlayedQuestions(newPlayedQuestions)
            if (newPlayedQuestions.every(row => row.every(el => el === 1))) {
                setShowFinalScore(true)
            }
        }
    }

    const handlePlayerAnswer = (playerIndex, isCorrect) => {
        if (playersAnswers[playerIndex] !== 0 || playersAnswers.some(a => a === 1)) return
        const addScore = VALUES[selectedQuestionIndex]
        updateScore(playerIndex, addScore, isCorrect)

        const newPlayersAnswers = Object.assign([], playersAnswers)
        newPlayersAnswers[playerIndex] = isCorrect ? 1 : -1
        setPlayersAnswers(newPlayersAnswers)
    }


    const topicsRows = topics.map((td, index) =>
        <TopicRow
            key={index}
            topicIndex={index}
            topic={td}
            handleQuestionSelect={handleQuestionSelect}
            rowPlayedQuestions={playedQuestions[index]}
            values={VALUES} />)

    return (
        showingTopicIndex >= 0 ?
            <Topic topic={topics[showingTopicIndex]} /> :

            showFinalScore ?
                <FinalScore players={players} updateRound={updateRound} round={round} /> :

                <div className='Gameboard' >
                    <div className='content'>
                        {selectedQuestionIndex === -1 && topicsRows}
                        {selectedQuestionIndex !== -1 &&
                            <Question
                                topic={topics[selectedTopicIndex]}
                                question={questions[selectedTopicIndex][selectedQuestionIndex]}
                                answer={answers[selectedTopicIndex][selectedQuestionIndex]}
                                isLimitedTime={isLimitedTime}
                                limitedTime={limitedTime}
                                playersAnswers={playersAnswers}
                                goToGameBoard={() => handleQuestionSelect(-1, -1)}
                            />}
                    </div>

                    <Score
                        players={players}
                        selectedQuestionIndex={selectedQuestionIndex}
                        playersAnswers={playersAnswers}
                        handlePlayerAnswer={handlePlayerAnswer}
                    />

                </div>
    )
}