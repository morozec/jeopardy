import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import plus from './../img/plus.png'
import minus from './../img/minus.png'
import { Modal, Button, Container, ListGroup, Form } from 'react-bootstrap';
import Loading from './Loading';
import { parseSelectedPackage, parseUserFile } from '../helpers/parsers';
import { corsProxy, groupsApi } from '../helpers/constants'

export default function Registration(props) {
    const [players, setPlayers] = useState(['Игрок 1'])
    const [selectedPlayer, setSelectedPlayer] = useState(-1)
    const [lastPlayerIndex, setLastPlayerIndex] = useState(1)
    const [showNewPlayer, setShowNewPlayer] = useState(false)
    const [newPlayerName, setNewPlayerName] = useState('');

    const [isDbSource, setIsDbSource] = useState(false)
    const [isLimitedTime, setIsLimitedTime] = useState(false)
    const [limitedTime, setLimitedTime] = useState(20)
    const [showGames, setShowGames] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPackagesLoading, setIsPackagesLoading] = useState(false)
    const [packages, setPackages] = useState([])

    const [userFileName, setUserFileName] = useState("");
    const [selectedPackegeName, setSelectedPackageName] = useState("");
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

    const handleIsDbSourceChange = (e) => {
        setIsDbSource(e.target.checked)
    }

    const handleIsLimitedTimeChanged = (e) => {
        setIsLimitedTime(e.target.checked)
    }

    const handleLimitiedTimeChanged = (e) => {
        setLimitedTime(e.target.value)
    }

    // const playersInputs = players.map((p, i) => (
    //     <div className="player-input" key={i}>
    //         <input value={p} autoFocus={i === 0}
    //             onChange={(e) => handleChange(e.target.value, i)} />

    //         <img src={minus} alt='remove player' className={`minus-img ${i === 0 ? 'disabled' : ''}`} onClick={() => handleMinus(i)} />

    //     </div>
    // ))

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
                setSelectedPackageName(pack.title);
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
        <Button variant='secondary' key={p.id} onClick={() => { handlePackageSelected(p); setShowGames(false); }} block>
            {p.title}
        </Button>
    )

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

    return (
        isLoading
            ? <Loading />
            : <div className='Registration'>

                <Container>

                    <ListGroup>
                        {playersInputs}
                    </ListGroup>

                    <div className='d-flex mt-2'>
                        <Button variant='success' className='flex-fill mr-1' onClick={handlePlus}>Добавить</Button>
                        <Button variant='danger' className='flex-fill ml-1' onClick={handleRemove}
                            disabled={players.length <= 1 || selectedPlayer < 0 || selectedPlayer >= players.length}>
                            Удалить
                        </Button>
                    </div>

                    <label>Использовать базу
                <input type='checkbox' checked={isDbSource} onChange={handleIsDbSourceChange} />
                    </label>

                    {isDbSource &&

                        <div className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={selectedPackegeName}
                                placeholder='Игра не выбрана'
                                disabled={true} />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button" onClick={handleShowGames}>
                                    Выбрать игру из базы
                            </button>
                            </div>
                        </div>

                    }

                    {!isDbSource &&
                        <div className="custom-file mb-2">
                            <input type="file" className="custom-file-input" id="packageFile" accept='.json' onChange={handleUserLoadFile} required />
                            <label className="custom-file-label" htmlFor="packageFile">{userFileName !== '' ? userFileName : 'Выбрать файл с вопросами'}</label>
                        </div>}
                    {!isDbSource && <Button variant='info' block href='/package.json' download>Скачать шаблон</Button>}

                    <label>Ограниченное время на ответ
                <input type='checkbox' checked={isLimitedTime} onChange={handleIsLimitedTimeChanged} />
                    </label>

                    {isLimitedTime &&
                        <label>Секунд на ответ
                    <input type='text' value={limitedTime} onChange={handleLimitiedTimeChanged} />
                        </label>
                    }

                    <Link
                        to={{
                            pathname: '/',
                            playersNames: players,
                            isLimitedTime: isLimitedTime,
                            limitedTime: limitedTime,
                            questionsPackage: questionPackage
                        }}>
                        <Button variant='primary' disabled={!questionPackage}>Начать игру</Button>
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
                                value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)}/>
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