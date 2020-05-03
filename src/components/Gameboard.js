import React, { useState, useEffect } from 'react'
import Question from './Question';
import TopicRow from './TopicRow';
import Score from './Score';
import Topic from './Topic';
import { ROUND_TOPICS_COUNT, TOPIC_QUESTIONS_COUNT, SHOW_TOPICS_TIME_MSECS, VALUES } from './../helpers/constants'
import { Modal, Button, Form } from 'react-bootstrap';

export default function GameBoard(props) {


    const { players, updateScore, round, roundData, isLimitedTime, limitedTime, changeScore, setShowFinalScore } = props

    const [showingTopicIndex, setShowingTopicIndex] = useState(0)

    const [playedQuestions, setPlayedQuestions] = useState(
        new Array(ROUND_TOPICS_COUNT).fill(
            new Array(TOPIC_QUESTIONS_COUNT).fill(0)))
    // const [curQuestion, setCurQuestion] = useState(undefined)

    const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1)
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1)

    //ответы игроков на текущий вопрос. 0 - не давал ответа, -1 - неправильный ответ, 1 - правильный ответ
    const [playersAnswers, setPlayersAnswers] = useState(new Array(players.length).fill(0))

    const [showCat, setShowCat] = useState(false);
    const [catPlayerIndex, setCatPlayerIndex] = useState(0);
    const [catValue, setCatValue] = useState(VALUES[0] * round);

    useEffect(() => {
        if (showingTopicIndex === -1) return;
        const timerId = setTimeout(() =>
            setShowingTopicIndex(showingTopicIndex < roundData.topics.length - 1
                ? showingTopicIndex + 1
                : -1),
            SHOW_TOPICS_TIME_MSECS);
        return () => clearTimeout(timerId)

    }, [showingTopicIndex, roundData])

    const handleQuestionSelect = (topicIndex, questionIndex) => {
        let isQuestionSelected = topicIndex !== -1 && questionIndex !== -1;
        setSelectedTopicIndex(topicIndex)
        setSelectedQuestionIndex(questionIndex)

        if (isQuestionSelected) {
            if (roundData.topics[topicIndex].questions[questionIndex].isCat) {
                setShowCat(true);
                return;
            }
        }

        if (!isQuestionSelected) { //вернулись на главный экран
            setPlayersAnswers(new Array(players.length).fill(0))

            const newPlayedQuestions = playedQuestions.map((row) => row.slice()) //full copy
            newPlayedQuestions[selectedTopicIndex][selectedQuestionIndex] = 1
            setPlayedQuestions(newPlayedQuestions)
            if (newPlayedQuestions.every(row => row.every(el => el === 1))) {
                setShowFinalScore(true)
            }
        }
    }

    const handlePlayerAnswer = (playerIndex, isCorrect, addValue) => {
        if (playersAnswers[playerIndex] !== 0 || playersAnswers.some(a => a === 1)) return

        updateScore(playerIndex, addValue, isCorrect)

        const newPlayersAnswers = Object.assign([], playersAnswers)
        newPlayersAnswers[playerIndex] = isCorrect ? 1 : -1
        setPlayersAnswers(newPlayersAnswers)
    }

    const handleCatPlayerChanged = (e) => {
        setCatPlayerIndex(+e.target.value);
    }

    const handleCatValueChanged = (e) => {
        setCatValue(+e.target.value);
    }

    const handlePlayCat = () => {
        console.log(catPlayerIndex, players[catPlayerIndex]);
        console.log(catValue);
        setShowCat(false);
        let playersAnswers = new Array(players.length).fill(null).map((v, i) => i === catPlayerIndex ? 0 : -1);
        setPlayersAnswers(playersAnswers);
    }


    const topicsRows = roundData.topics.map((td, index) =>
        <TopicRow
            key={index}
            topicIndex={index}
            topic={td}
            handleQuestionSelect={handleQuestionSelect}
            rowPlayedQuestions={playedQuestions[index]}
            values={VALUES}
            round={round} />)


    const catPlayers = players.map((p, i) => <option disabled={p.isActive} key={i} value={i}>{p.name}</option>);
    const showQuestion = selectedTopicIndex !== -1 && selectedQuestionIndex !== -1 && !showCat;
    const questionValue =
        !showQuestion
            ? 0
            : roundData.topics[selectedTopicIndex].questions[selectedQuestionIndex].isCat
                ? catValue
                : VALUES[selectedQuestionIndex] * round;

    return (
        showingTopicIndex >= 0 ?
            <Topic topicName={roundData.topics[showingTopicIndex].name} /> :



            <div className='Gameboard' >
                <div className='content'>
                    {!showQuestion && topicsRows}
                    {showQuestion &&
                        <Question
                            topicName={roundData.topics[selectedTopicIndex].name}
                            question={roundData.topics[selectedTopicIndex].questions[selectedQuestionIndex].question}
                            answer={roundData.topics[selectedTopicIndex].questions[selectedQuestionIndex].answer}
                            isLimitedTime={isLimitedTime}
                            limitedTime={limitedTime}
                            playersAnswers={playersAnswers}
                            goToGameBoard={() => handleQuestionSelect(-1, -1)}
                            isFinalRound={false}
                        />}
                </div>

                <Score
                    players={players}
                    canAnswer={showQuestion}
                    playersAnswers={playersAnswers}
                    handlePlayerAnswer={handlePlayerAnswer}
                    changeScore={changeScore}
                    setShowFinalScore={setShowFinalScore}
                    questionValue={questionValue}
                />

                <Modal show={showCat} onHide={() => setShowCat(false)} centered backdrop={false}>
                    <Modal.Header>
                        <Modal.Title>Кот в мешке. Тема: {123}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Игрок</Form.Label>
                                <Form.Control as="select" value={catPlayerIndex} onChange={handleCatPlayerChanged}>
                                    {catPlayers}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Стоимость</Form.Label>
                                <Form.Control as="select" value={catValue} onChange={handleCatValueChanged}>
                                    <option value={VALUES[0] * round}>{VALUES[0] * round}</option>
                                    <option value={VALUES[VALUES.length - 1] * round}>{VALUES[VALUES.length - 1] * round}</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handlePlayCat} block disabled={players[catPlayerIndex].isActive}>Играть вопрос</Button>
                    </Modal.Footer>
                </Modal>

            </div>
    )
}