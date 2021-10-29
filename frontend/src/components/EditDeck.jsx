import axios from 'axios'
import React, {useEffect, useState} from 'react'
import EditCard from '../components/EditCard'
import Pagination from './Pagination'

const EditDeck = props =>{
    const [deck, setDeck] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages]= useState(1)
    

    useEffect(()=>{
        // axios.get("http://localhost:8000/api/card/deckSet/"+props.deckName+"/"+page)
        axios.get("/backend/api/card/deckSet/"+props.deckName+"/"+page)
        .then(res=>{
            setDeck(res.data.deckSet)
            setTotalPages(res.data.totalPages)
            })
    },[props.deckName, props.update, page])

    useEffect(()=>{
        if(deck.length >0){
            props.setAspectRatio(deck[0].aspectRatio)
        }
    }, [deck, props])

    if(deck.length>0){
        return(
            <div className="body">
                <h3>Remove a Card</h3>
                <div className="editDeck">
                    {deck.map((card, i)=>{
                        return(
                            <EditCard card={card} key={i} giveUpdate={props.giveUpdate}/>
                        )
                    })}
                </div>
                <Pagination setPage={setPage} page={page} totalPages={totalPages}/>
            </div>
        )
    }
    return("")
}
export default EditDeck;