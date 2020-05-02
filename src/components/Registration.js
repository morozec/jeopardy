import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import plus from './../img/plus.png'
import minus from './../img/minus.png'
import { Modal, Button, Container } from 'react-bootstrap';

export default function Registration(props) {
    const [players, setPlayers] = useState(['Игрок 1'])
    const [isDbSource, setIsDbSource] = useState(false)
    const [isLimitedTime, setIsLimitedTime] = useState(false)
    const [limitedTime, setLimitedTime] = useState(20)
    const [showGames, setShowGames] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [packages, setPackages] = useState([])
    const [userFile, setUserFile] = useState(null)
    const [selectedPackage, setSelectedPackage] = useState(null)

    const handleChange = (newValue, index) => {
        const newPlayers = Object.assign([], players)
        newPlayers[index] = newValue
        setPlayers(newPlayers)
    }

    const handlePlus = () => {
        const newPlayers = Object.assign([], players)
        newPlayers.push(`Игрок ${players.length + 1}`)
        setPlayers(newPlayers)
    }

    const handleMinus = (index) => {
        if (index === 0) return
        const newPlayers = Object.assign([], players)
        newPlayers.splice(index, 1)
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

    const playersInputs = players.map((p, i) => (
        <div className="player-input" key={i}>
            <input value={p} autoFocus={i === 0}
                onChange={(e) => handleChange(e.target.value, i)} />

            <img src={minus} alt='remove player' className={`minus-img ${i === 0 ? 'disabled' : ''}`} onClick={() => handleMinus(i)} />

        </div>
    )

    )

    const handleUserLoadFile = (ev) => {
        setUserFile(ev.target.files[0])
    }

    const handleShowGames = () => {
        setIsLoading(true)
        setShowGames(true)

        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const groupsApi = 'http://api.baza-voprosov.ru/groups/SVOYAK';
        fetch(corsProxy + groupsApi)
            .then(response => response.json())
            .then(obj => {
                setPackages(obj.packages);
            })
            .finally(() => setIsLoading(false))
    }

    const packagesList = packages.map((p) =>
        <Button variant='secondary' key = {p.id} onClick={() => {setSelectedPackage(p); setShowGames(false);}} block>
            {p.title}
        </Button>
    )

    const handleHideGames = () => {
        setShowGames(false);
    }


    return (
        <div className='Registration'>
            {playersInputs}
            <img src={plus} alt='add player' className='plus-img' onClick={handlePlus} />
            <label>Использовать базу
                <input type='checkbox' checked={isDbSource} onChange={handleIsDbSourceChange} />
            </label>

            {isDbSource &&
                <Container>
                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            value={selectedPackage ? selectedPackage.title : ""} 
                            placeholder='Игра не выбрана'
                            disabled={true} />
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" onClick={handleShowGames}>
                                Выбрать игру из базы
                            </button>
                        </div>
                    </div>
                </Container>
            }

            {!isDbSource &&
                <Container>
                    <div className="custom-file mb-2">
                        <input type="file" className="custom-file-input" id="packageFile" accept='.json' onChange={handleUserLoadFile} required />
                        <label className="custom-file-label" htmlFor="packageFile">{userFile ? userFile.name : 'Выбрать файл с вопросами'}</label>
                    </div>
                    <Button variant='info' block href='/package.json' download>Скачать шаблон</Button>
                </Container>}

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
                    userFile: userFile,
                    selectedPackage: selectedPackage    
                }}>
                <Button variant='primary' disabled={!userFile && !selectedPackage}>Начать игру</Button>
            </Link>


            <Modal show={showGames} onHide={handleHideGames} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Список игр</Modal.Title>
                </Modal.Header>
                <Modal.Body className='packages-list'>{isLoading ? 'Loading...' : packagesList}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideGames}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}