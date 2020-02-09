import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import plus from './../img/plus.png'
import minus from './../img/minus.png'

export default function Registration() {
    const [players, setPlayers] = useState(['Игрок 1'])

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

    const playersInputs = players.map((p, i) => (
        <div className="player-input" key={i}>
            <input value={p} autoFocus={i === 0}
                onChange={(e) => handleChange(e.target.value, i)} />

            <img src={minus} alt='remove player' className={`minus-img ${i === 0 ? 'disabled' : ''}`} onClick={() => handleMinus(i)} />

        </div>
    )

    )

    return (
        <div className='Registration'>
            {playersInputs}
            <img src={plus} alt='add player' className='plus-img' onClick={handlePlus} />
            <Link to={{
                pathname: '/board',
                playersNames: players
            }}>Начать игру</Link>
        </div>
    )
}