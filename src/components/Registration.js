import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal, Button, Container, ListGroup, Form, ToggleButtonGroup, ToggleButton, Row, Col } from 'react-bootstrap';
import Loading from './Loading';
import { parseSelectedPackage, parseUserFile } from '../helpers/parsers';
import { corsProxy, groupsApi, ANSWER_SECONDS } from '../helpers/constants'

export default function Registration(props) {
    const [players, setPlayers] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState(-1)
    const [lastPlayerIndex, setLastPlayerIndex] = useState(0)
    const [showNewPlayer, setShowNewPlayer] = useState(false)
    const [newPlayerName, setNewPlayerName] = useState('');

    const [packageSource, setPackageSource] = useState(0)

    const [limitedTime, setLimitedTime] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const [packages, setPackages] = useState([])

    const [userFileName, setUserFileName] = useState("");
    const [selectedPackegeId, setSelectedPackageId] = useState(-1);

    const [questionPackage, setQuestionPackage] = useState(null)

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePlus = () => {
        setNewPlayerName(`Игрок ${lastPlayerIndex + 1}`);
        setShowNewPlayer(true);
    }

    const handleAddNewPlayer = () => {
        const newPlayers = Object.assign([], players)
        newPlayers.push(newPlayerName)
        setLastPlayerIndex(lastPlayerIndex + 1);
        setPlayers(newPlayers)
        setShowNewPlayer(false);
    }

    const handleRemove = () => {
        const newPlayers = Object.assign([], players)
        newPlayers.splice(selectedPlayer, 1)
        setPlayers(newPlayers)
    }

    const handleChangePackageSource = (e) => {
        setPackageSource(e);
        if (e === 1) {//вопросы из базы
            setIsLoading(true)

            fetch(corsProxy + groupsApi)
                .then(response => response.json())
                .then(obj => {
                    setPackages(obj.packages);
                    //setSelectedPackageName(obj.packages[0])
                })
                .finally(() => setIsLoading(false))
        }
    }

    const handleUserLoadFile = (ev) => {
        const file = ev.target.files[0];
        (async function () {
            try {
                setIsLoading(true);
                let qp = await parseUserFile(file);
                setUserFileName(file.name);
                setQuestionPackage(qp);
            } catch (err) {
                setErrorMessage(err.message);
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }

    const handleHideError = () => {
        setErrorMessage("");
        setShowError(false);
    }

    const handleHideNewPlayer = () => setShowNewPlayer(false)

    const handleNewPlayerLoad = () => {
        let newPlayerNameInput = document.getElementById('new-player-name');
        newPlayerNameInput.select();
    }

    const handleSelectedPackageChanged = (e) => {
        let id = e.target.value;
        (async function () {
            try {
                setIsLoading(true);
                let qp = await parseSelectedPackage(id);
                setSelectedPackageId(id);
                setQuestionPackage(qp);
            } catch (err) {
                setErrorMessage(err.message);
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
        })()
    }

    const playersInputs = players.map((p, i) => (
        <ListGroup.Item className='text-center pointer' active={i === selectedPlayer} key={i} onClick={() => setSelectedPlayer(i)}>
            {p}
        </ListGroup.Item>
    ))

    const packagesOptions = [<option key={-1} value={-1} disabled={true}>Выбрать пакет...</option>,
    ...packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)]

    const answerSecondsOptions = ANSWER_SECONDS.map(as => <option key={as} value={as}>{as === -1 ? 'Не ограничено' : as}</option>)


    return (
        isLoading
            ? <Loading />
            : <div className='Registration'>

                <Container>

                    <Form>

                        <Form.Group as={Row}>
                            <Col>
                                <ListGroup>
                                    {playersInputs}
                                </ListGroup>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Col sm='6'>
                                <Button variant='success' onClick={handlePlus} block>Добавить игрока</Button>
                            </Col>
                            <Col sm='6'>
                                <Button variant='danger' onClick={handleRemove} block
                                    disabled={selectedPlayer < 0 || selectedPlayer >= players.length}>
                                    Удалить игрока
                                </Button>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col>
                                <ToggleButtonGroup type="radio" name="packageSource" value={packageSource} onChange={handleChangePackageSource}
                                    className='d-flex'>
                                    <ToggleButton variant='outline-secondary' value={0}>Вопросы из локального файла</ToggleButton>
                                    <ToggleButton variant='outline-secondary' value={1}>Вопросы из базы <strong>db.chgk.info</strong></ToggleButton>
                                </ToggleButtonGroup>
                            </Col>
                        </Form.Group>


                        {packageSource === 0 &&
                            <Form.Group as={Row}>
                                <Col sm='6'>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input pointer" id="packageFile" accept='.json' onChange={handleUserLoadFile} required />
                                        <label className="custom-file-label" htmlFor="packageFile" data-browse="Обзор...">{userFileName !== '' ? userFileName : 'Выбрать файл с вопросами'}</label>
                                    </div>
                                </Col>
                                <Col sm='6'>
                                    <Button variant='secondary' href='/package.json' block download>Скачать шаблон</Button>
                                </Col>
                            </Form.Group>
                        }

                        {packageSource === 1 &&
                            <Form.Group as={Row}>
                                <Col>
                                    <Form.Control as="select" value={selectedPackegeId} onChange={handleSelectedPackageChanged}>
                                        {packagesOptions}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        }


                        <Form.Group as={Row}>
                            <Form.Label column sm='6' className='reg-label'>Время на ответ (в секундах)</Form.Label>
                            <Col sm='6'>
                                <Form.Control as="select" value={limitedTime} onChange={(e) => setLimitedTime(+e.target.value)}>
                                    {answerSecondsOptions}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col>
                                <Link className='start-game-link'
                                    to={{
                                        pathname: '/',
                                        playersNames: players,
                                        limitedTime: limitedTime,
                                        questionsPackage: questionPackage
                                    }}>
                                    <Button variant='primary' disabled={!questionPackage} block
                                        title={
                                            players.length === 0
                                                ? 'Добавьте хотя бы одного игрока'
                                                : !questionPackage
                                                    ? 'Выберите игровой пакет'
                                                    : ''
                                        }>
                                        Начать игру
                                    </Button>
                                </Link>
                            </Col>
                        </Form.Group>

                    </Form>


                    <Modal show={showError} onHide={handleHideError} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Ошибка при загрузке пакета</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{errorMessage}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" block onClick={handleHideError}>
                                Закрыть
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showNewPlayer} onHide={handleHideNewPlayer} centered onShow={handleNewPlayerLoad}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавление игрока</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Control id='new-player-name' type="text" placeholder="Введите имя"
                                value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleAddNewPlayer} disabled={newPlayerName === ''}>
                                Принять
                            </Button>
                            <Button variant="secondary" onClick={handleHideNewPlayer}>
                                Отмена
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>

            </div>
    )
}