import React, { useState, useEffect } from 'react'
import Question from './Question';
import TopicRow from './TopicRow';
import Score from './Score';
import Topic from './Topic';
import { ROUND_TOPICS_COUNT, TOPIC_QUESTIONS_COUNT, SHOW_TOPICS_TIME_MSECS, VALUES } from '../helpers/constants'
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
    const [catTopic, setCatTopic] = useState("");
    const [catPlayerIndex, setCatPlayerIndex] = useState(0);
    const [catValue, setCatValue] = useState(VALUES[0] * round);

    const [showAuction, setShowAuction] = useState(false);
    const [auctionPlayerIndex, setAuctionPlayerIndex] = useState(0);
    const [auctionValue, setAuctionValue] = useState(0);

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
                setCatTopic(roundData.topics[topicIndex].questions[questionIndex].topicName)
                setShowCat(true);
                return;
            }
            if (roundData.topics[topicIndex].questions[questionIndex].isAuction) {
                setAuctionValue(VALUES[questionIndex] * round);
                setShowAuction(true);
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

    const handlePlayerAnswer = (playerIndex, isCorrect, addScore) => {
        if (playersAnswers[playerIndex] !== 0 || playersAnswers.some(a => a === 1)) return
        const question = roundData.topics[selectedTopicIndex].questions[selectedQuestionIndex];
        updateScore(playerIndex, addScore, isCorrect, question.isCat || question.isAuction)

        const newPlayersAnswers = Object.assign([], playersAnswers)
        newPlayersAnswers[playerIndex] = isCorrect ? 1 : -1
        setPlayersAnswers(newPlayersAnswers)
    }

    const catPlayers = players.map((p, i) => <option disabled={p.isActive} key={i} value={i}>{p.name}</option>);

    const handleCatPlayerChanged = (e) => {
        setCatPlayerIndex(+e.target.value);
    }

    const handleCatValueChanged = (e) => {
        setCatValue(+e.target.value);
    }

    const handlePlayCat = () => {
        setShowCat(false);
        let playersAnswers = new Array(players.length).fill(null).map((v, i) => i === catPlayerIndex ? 0 : -1);
        setPlayersAnswers(playersAnswers);
    }


    const canPlayAuction = (i) => players[i].isActive || players[i].score > VALUES[selectedQuestionIndex] * round;
    const getAuctionMinValue = (i) => VALUES[selectedQuestionIndex] * round;
    const getAuctionMaxValue = (i) => Math.max(VALUES[selectedQuestionIndex] * round, players[i].score);


    const auctionPlayers = players.map((p, i) => <option disabled={!canPlayAuction(i)} key={i} value={i}>{p.name}</option>)

    const handleAuctionPlayerChanged = (e) => {
        setAuctionPlayerIndex(+e.target.value);
    }

    const handleAuctionValueChanged = (e) => {
        setAuctionValue(+e.target.value);
    }

    const handlePlayAuction = () => {
        setShowAuction(false);
        let playersAnswers = new Array(players.length).fill(null).map((v, i) => i === auctionPlayerIndex ? 0 : -1);
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



    const showQuestion = selectedTopicIndex !== -1 && selectedQuestionIndex !== -1 && !showCat && !showAuction;
    const questionValue =
        !showQuestion
            ? 0
            : roundData.topics[selectedTopicIndex].questions[selectedQuestionIndex].isCat
                ? catValue
                : roundData.topics[selectedTopicIndex].questions[selectedQuestionIndex].isAuction
                    ? auctionValue
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
                        <Modal.Title>
                            Кот в мешке. Тема: {catTopic}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor='catPlayer'>Игрок</Form.Label>
                                <Form.Control as="select" value={catPlayerIndex} onChange={handleCatPlayerChanged} id='catPlayer'>
                                    {catPlayers}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='catValue'>Стоимость</Form.Label>
                                <Form.Control as="select" value={catValue} onChange={handleCatValueChanged} id='catValue'>
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

                <Modal show={showAuction} onHide={() => setShowAuction(false)} centered backdrop={false}>
                    <Modal.Header>
                        <Modal.Title>Вопрос-аукцион</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor='auctionPlayer'>Игрок</Form.Label>
                                <Form.Control as="select" value={auctionPlayerIndex} onChange={handleAuctionPlayerChanged} id='auctionPlayer'>
                                    {auctionPlayers}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='auctionValue'>Ставка</Form.Label>
                                <Form.Control as="input"
                                    type="number"
                                    step={100}
                                    min={getAuctionMinValue(auctionPlayerIndex)}
                                    max={getAuctionMaxValue(auctionPlayerIndex)}
                                    value={auctionValue}
                                    onChange={handleAuctionValueChanged}
                                    id='auctionValue'
                                >
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handlePlayAuction} block disabled={
                            !(canPlayAuction(auctionPlayerIndex)
                                && auctionValue >= getAuctionMinValue(auctionPlayerIndex)
                                && auctionValue <= getAuctionMaxValue(auctionPlayerIndex))
                        }>Играть вопрос</Button>
                    </Modal.Footer>
                </Modal>

            </div >
    )
}