import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import plus from './../img/plus.png'
import minus from './../img/minus.png'
import { Modal, Button } from 'react-bootstrap';

export default function Registration() {
    const [players, setPlayers] = useState(['Игрок 1'])
    const [isDbSource, setIsDbSource] = useState(true)
    const [isLimitedTime, setIsLimitedTime] = useState(false)
    const [limitedTime, setLimitedTime] = useState(20)
    const [showGames, setShowGames] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [packages, setPackages] = useState([])

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
        <div key={p.id}>
            <Link
                to={{
                    pathname: '/',
                    playersNames: players,
                    packageId: p.id,
                    isLimitedTime: isLimitedTime,
                    limitedTime: limitedTime
                }}>
                {p.title}
            </Link>
        </div>
    )

    const handleHideGames = () => setShowGames(false)


    return (
        <div className='Registration'>
            {playersInputs}
            <img src={plus} alt='add player' className='plus-img' onClick={handlePlus} />
            <label>Использовать базу
                <input type='checkbox' checked={isDbSource} onChange={handleIsDbSourceChange} disabled={true} />
            </label>

            <label>Ограниченное время на ответ
                <input type='checkbox' checked={isLimitedTime} onChange={handleIsLimitedTimeChanged} />
            </label>

            {isLimitedTime &&
                <label>Секунд на ответ 
                    <input type='text' value={limitedTime} onChange={handleLimitiedTimeChanged} />
                </label>
            }

            <Button onClick={handleShowGames}>Начать игру</Button>


            <Modal show={showGames} onHide={handleHideGames} >
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