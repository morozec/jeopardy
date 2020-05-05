import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import plus from './../img/plus.png'
import minus from './../img/minus.png'
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
    const [showGames, setShowGames] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPackagesLoading, setIsPackagesLoading] = useState(false)
    const [packages, setPackages] = useState([])

    const [userFileName, setUserFileName] = useState("");
    const [selectedPackegeId, setSelectedPackageId] = useState(-1);

    const [questionPackage, setQuestionPackage] = useState(null)

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (newValue, index) => {
        const newPlayers = Object.assign([], players)
        newPlayers[index] = newValue
        setPlayers(newPlayers)
    }

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


    const playersInputs = players.map((p, i) => (
        <ListGroup.Item className='text-center pointer' active={i === selectedPlayer} key={i} onClick={() => setSelectedPlayer(i)}>
            {p}
        </ListGroup.Item>
    ))

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

    const handleShowGames = () => {
        setIsPackagesLoading(true)
        setShowGames(true)

        fetch(corsProxy + groupsApi)
            .then(response => response.json())
            .then(obj => {
                setPackages(obj.packages);

            })
            .finally(() => setIsPackagesLoading(false))
    }

    const handlePackageSelected = (pack) => {
        (async function () {
            try {
                setIsLoading(true);
                let qp = await parseSelectedPackage(pack);
                //setSelectedPackageName(pack.title);
                setQuestionPackage(qp);
            } catch (err) {
                setErrorMessage(err.message);
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
        })()
    }

    const packagesList = packages.map((p) =>
        <Button variant='success' key={p.id} onClick={() => { handlePackageSelected(p); setShowGames(false); }} block>
            {p.title}
        </Button>
    )

    const packagesOptions = [<option key={-1} value={-1} disabled={true}>Выбрать пакет...</option>,
    ...packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)]

    const answerSecondsOptions = ANSWER_SECONDS.map(as => <option key={as} value={as}>{as === -1 ? 'Не ограничено' : as}</option>)

    const handleHideGames = () => {
        setShowGames(false);
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

    return (
        isLoading
            ? <Loading />
            : <div className='Registration'>

                <Container>

                    <ListGroup>
                        {playersInputs}
                    </ListGroup>

                    <div className='d-flex mt-2 mb-4'>
                        <Button variant='success' className='half-width mr-1' onClick={handlePlus}>Добавить</Button>
                        <Button variant='danger' className='half-width ml-1' onClick={handleRemove}
                            disabled={selectedPlayer < 0 || selectedPlayer >= players.length}>
                            Удалить
                        </Button>
                    </div>


                    <ToggleButtonGroup type="radio" name="packageSource" value={packageSource} onChange={handleChangePackageSource}
                        className='d-flex mb-2'>
                        <ToggleButton variant='outline-secondary' value={0}>Вопросы из локального файла</ToggleButton>
                        <ToggleButton variant='outline-secondary' value={1}>Вопросы из базы <strong>db.chgk.info</strong></ToggleButton>
                    </ToggleButtonGroup>


                    {packageSource === 0 &&
                        <div className='d-flex mb-4'>
                            <div className="custom-file half-width mr-1 ">
                                <input type="file" className="custom-file-input pointer" id="packageFile" accept='.json' onChange={handleUserLoadFile} required />
                                <label className="custom-file-label" htmlFor="packageFile" data-browse="Обзор...">{userFileName !== '' ? userFileName : 'Выбрать файл с вопросами'}</label>
                            </div>
                            <div className='half-width ml-1'>
                                <Button variant='secondary' href='/package.json' block download>Скачать шаблон</Button>
                            </div>
                        </div>
                    }

                    {packageSource === 1 &&
                        <Form.Group className='mb-4'>
                            <Form.Control as="select" value={selectedPackegeId} onChange={handleSelectedPackageChanged}>
                                {packagesOptions}
                            </Form.Control>
                        </Form.Group>
                    }


                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm='6'>Время на ответ (в секундах)</Form.Label>
                        <Col sm='6'>
                            <Form.Control as="select" value={limitedTime} onChange={(e) => setLimitedTime(+e.target.value)}>
                                {answerSecondsOptions}
                            </Form.Control>
                        </Col>
                    </Form.Group>


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


                    <Modal show={showGames} onHide={handleHideGames} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Список игр</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='packages-list'>{isPackagesLoading ? <Loading /> : packagesList}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" block onClick={handleHideGames}>
                                Отмена
                            </Button>
                        </Modal.Footer>
                    </Modal>

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