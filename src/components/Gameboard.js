import React, { useState, useEffect } from 'react'
import TopicRow from './TopicRow';
import TopicData from '../data/Topic.data';
import Player from '../data/Players';
import Question from './Question';

import correctImg from './../img/correct.png'
import wrongImg from './../img/wrong.png'


function Gameboard(props) {

    const { playersNames, packageId } = props.location
    // console.log(packageId)

    const [players, setPlayers] = useState(() => playersNames ? playersNames.map(pn => new Player(pn, 0)) : [])
    const [curPlayerIndex, setCurPlayerIndex] = useState(0)
    const [curQuestion, setCurQuestion] = useState(undefined)
    const [wrongAnswerIndexes, setWrongAnswerIndexes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [topics, setTopics] = useState([])
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        if (!packageId) return

        setIsLoading(true)
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const packageApi = 'http://api.baza-voprosov.ru/packages/';
        fetch(`${corsProxy}${packageApi}${packageId}`)
            .then(response => response.json())
            .then(pack => {
                const data = pack.tours[0].questions
                const topics = data.map(d => d.question.split('\n ')[0])
                // console.log(topics)
                const questions = data.map(d => d.question.split('\n ').slice(1))
                // console.log(questions)
                const answers = data.map(d => d.answer.split('\n '))
                // console.log(answers)

                setTopics(topics)
                setQuestions(questions)
                setAnswers(answers)
            })
            .finally(() => setIsLoading(false))

    }, [packageId])

    if (!playersNames) {
        props.history.push('/reg')
        return null
    }

    const handleQuestionSelect = (topic, text, value) => {
        setCurQuestion({ topic, text, value })
    }

    const handlePlayerAnswer = (index, addScore, isCorrect) => {
        if (wrongAnswerIndexes.includes(index)) return
        const newPlayers = Object.assign([], players)
        newPlayers[index].score += isCorrect ? addScore : -addScore
        setPlayers(newPlayers)
        if (isCorrect) {
            setCurQuestion(undefined)
            setCurPlayerIndex(index)
            setWrongAnswerIndexes([])
        } else {
            const newWrongAnswerIndexes = Object.assign([], wrongAnswerIndexes)
            newWrongAnswerIndexes.push(index)
            setWrongAnswerIndexes(newWrongAnswerIndexes)
        }
    }



    // const topicsDatas = [
    //     new TopicData("ТЕМА 1", ["Вопрос 1.1", "Вопрос 1.2", "Вопрос 1.3", "Вопрос 1.4", "Вопрос 1.5"]),
    //     new TopicData("ТЕМА 2", ["Вопрос 2.1", "Вопрос 2.2", "Вопрос 2.3", "Вопрос 2.4", "Вопрос 2.5"]),
    //     new TopicData("ТЕМА 3", ["Вопрос 3.1", "Вопрос 3.2", "Вопрос 3.3", "Вопрос 3.4", "Вопрос 3.5"]),
    //     new TopicData("ТЕМА 4", ["Вопрос 4.1", "Вопрос 4.2", "Вопрос 4.3", "Вопрос 4.4", "Вопрос 4.5"]),
    //     new TopicData("ТЕМА 5", ["Вопрос 5.1", "Вопрос 5.2", "Вопрос 5.3", "Вопрос 5.4", "Вопрос 5.5"]),
    //     new TopicData("ТЕМА 6", ["Вопрос 6.1", "Вопрос 6.2", "Вопрос 6.3", "Вопрос 6.4", "Вопрос 6.5"]),
    // ]
    const topicsRows = topics.map((td, index) =>
        <TopicRow key={index} topic={td} questions={questions[index]} players={players} handlePlayerAnswer={handlePlayerAnswer} handleQuestionSelect={handleQuestionSelect} />)
    const playersScores = players.map((p, i) => (
        <div key={i} className={`player-info ${curPlayerIndex === i ? 'is-current' : ''}`}>
            <div>{p.name}</div>
            <div className='player-score'>{p.score}</div>

            {curQuestion && <img src={correctImg} alt='correct'
                className={`pa-button ${wrongAnswerIndexes.includes(i) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, curQuestion.value, true)} />}
            {curQuestion && <img src={wrongImg} alt='wrong'
                className={`pa-button ${wrongAnswerIndexes.includes(i) ? 'disabled' : ''}`}
                onClick={() => handlePlayerAnswer(i, curQuestion.value, false)} />}
        </div>
    ))

    // const values = [100, 200, 300, 400, 500];

    // const listItems = topics.map((q, index) =>
    //     <li>{values[index]}-{q}</li>)


    return (
        <div className='Gameboard' >
            {isLoading ?
                <div className='content'>Loading...</div> :
                <div className='content'>
                    {!curQuestion && topicsRows}
                    {curQuestion && <Question question={curQuestion} />}
                </div>
            }

            <div className='player-info-container'>
                {playersScores}
            </div>


        </div>
    )
}

export default Gameboard;