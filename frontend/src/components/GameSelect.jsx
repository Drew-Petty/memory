import React from 'react'
import { navigate } from '@reach/router'

const GameSelect = props =>{
    const onClickHandler = e =>{
        navigate(`/game/${props.topCard.deckName}/${props.route}`)
    }

    return(
        <div className="topCardDeckSelect" onClick={onClickHandler}>
            {/* <img className="topCardImage" src={`http://localhost:8000/uploads/${props.topCard.fileName}`} alt={props.topCard.fileName}/> */}
            <img className="topCardImage" src={`/backend/uploads/${props.topCard.fileName}`} alt={props.topCard.fileName}/>
            <h3 className="deckTitle">{props.topCard.deckName}</h3>
        </div>
        )
}
export default GameSelect