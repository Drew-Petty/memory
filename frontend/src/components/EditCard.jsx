import React from 'react'
import axios from 'axios'

const EditCard = props =>{
    
    const deleteCardHandler = e =>{
        // axios.delete(`http://localhost:8000/api/card/delete/${props.card.fileName}`)
        axios.delete(`/backend/api/card/delete/${props.card.fileName}`)
        .then(res => props.giveUpdate())
    }
    
    return(
        <div className="editCard">
            {/* <img className="editCardImage" style={{aspectRatio: `${props.card.aspectRatio}`}} src={`http://localhost:8000/uploads/${props.card.fileName}`} alt={props.card.fileName}/> */}
            <img className="editCardImage" style={{aspectRatio: `${props.card.aspectRatio}`}} src={`/backend/uploads/${props.card.fileName}`} alt={props.card.fileName}/>
            <button className="editCardDeleteButton" onClick={deleteCardHandler}>Delete?</button>
        </div>
    )
}
export default EditCard;