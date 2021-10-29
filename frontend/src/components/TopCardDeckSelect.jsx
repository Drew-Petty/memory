import React from 'react'
import { navigate } from '@reach/router'

const TopCardDeckSelect = props =>{
    const onClickHandler = e=>{
        navigate(`/deck/${props.topCard.deckName}`)
    }

    return(
        <div className="topCardDeckSelect" onClick={onClickHandler}>
            <img className="topCardImage" src={`/backend/uploads/${props.topCard.fileName}`} alt={props.topCard.fileName} />
            {/* <img className="topCardImage" src={`http://localhost:8000/uploads/${props.topCard.fileName}`} alt={props.topCard.fileName} /> */}
            <h3 className="deckTitle">{props.topCard.deckName}</h3>
        </div>
    )
}
export default TopCardDeckSelect;