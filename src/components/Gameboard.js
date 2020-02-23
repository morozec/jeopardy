import React, { useState } from 'react'
import Question from './Question';
import TopicRow from './TopicRow';
import Score from './Score';


export default function GameBoard(props) {

    const ROUND_TOPICS_COUNT = 6
    const QUESTIONS_COUNT = 5
    const VALUES = [100, 200, 300, 400, 500]

    const { players, updateScore, round } = props

    const start = ROUND_TOPICS_COUNT * (round - 1)
    const end = ROUND_TOPICS_COUNT * (round)
    const topics = props.topics.slice(start, end)
    const questions = props.questions.slice(start, end)
    const answers = props.answers.slice(start, end)

    const [playedQuestions, setPlayedQuestions] = useState(
        new Array(ROUND_TOPICS_COUNT).fill(
            new Array(QUESTIONS_COUNT).fill(0)))
    // const [curQuestion, setCurQuestion] = useState(undefined)

    const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1)
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1)

    const [wrongAnswerIndexes, setWrongAnswerIndexes] = useState([])

    const handleQuestionSelect = (topicIndex, questionIndex) => {
        setSelectedTopicIndex(topicIndex)
        setSelectedQuestionIndex(questionIndex)
    }

    const handlePlayerAnswer = (playerIndex, isCorrect) => {
        if (wrongAnswerIndexes.includes(playerIndex)) return
        const addScore = VALUES[selectedQuestionIndex]
        updateScore(playerIndex, addScore, isCorrect)

        if (isCorrect) {
            setSelectedTopicIndex(-1)
            setSelectedQuestionIndex(-1)
            setWrongAnswerIndexes([])
            const newPlayedQuestions = playedQuestions.map((row) => row.slice()) //full copy
            newPlayedQuestions[selectedTopicIndex][selectedQuestionIndex] = 1
            setPlayedQuestions(newPlayedQuestions)
        } else {
            const newWrongAnswerIndexes = Object.assign([], wrongAnswerIndexes)
            newWrongAnswerIndexes.push(playerIndex)
            setWrongAnswerIndexes(newWrongAnswerIndexes)
        }
    }


    const topicsRows = topics.map((td, index) =>
        <TopicRow
            key={index}
            topicIndex={index}
            topic={td}
            handleQuestionSelect={handleQuestionSelect}
            rowPlayedQuestions={playedQuestions[index]} 
            values={VALUES}/>)

    return (
        <div className='Gameboard' >
            <div className='content'>
                {selectedQuestionIndex === -1 && topicsRows}
                {selectedQuestionIndex !== -1 &&
                    <Question
                        topic={topics[selectedTopicIndex]}
                        question={questions[selectedTopicIndex][selectedQuestionIndex]} />}
            </div>

            <Score
                players={players}
                selectedQuestionIndex={selectedQuestionIndex}
                wrongAnswerIndexes={wrongAnswerIndexes}
                handlePlayerAnswer={handlePlayerAnswer} />

        </div>
    )
}