import React from 'react'
import {ROUNDS_COUNT} from './../helpers/constants'

export default function Round(props){
    const {hideRound} = props;
    return (
        <div className='centered round' onClick={hideRound}>
            {props.round <= ROUNDS_COUNT ? props.round : 'Финальный'} раунд
        </div>
    )
}