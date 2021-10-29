import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { Link } from '@reach/router'
import Pagination from './Pagination'
import TopCardDeckSelect from './TopCardDeckSelect'
import { UserContext } from '../App'

const DeckSelect = props =>{
    const [deckTopCards, setDeckTopCards] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages]= useState(1)

    const user = useContext(UserContext)
    
    useEffect(()=>{
        // axios.get(`http://localhost:8000/api/card/topCardSet/${user.email}/${page}`)
        axios.get(`/backend/api/card/topCardSet/${user.email}/${page}`)
        .then(res=>{
            setDeckTopCards(res.data.deckTopCards)
            setTotalPages(res.data.totalPages)
        })
    },[user.email,page])
    
    if(deckTopCards.length>0){
        return(
            <div className="body">
                <h3>Select a Deck</h3>
                <h3>or</h3>
                <Link to={'/newDeck'} ><h3>Create a new Deck</h3></Link>
                <div className="paginatedItems">
                    {deckTopCards.map((topCard, i)=>{
                        return(
                        <TopCardDeckSelect topCard={topCard} key={i}/>
                        )
                    })}
                </div>
                <Pagination setPage={setPage} page={page} totalPages={totalPages}/>
            </div>
            )
    }
    return(
        <div className="body">
            <Link to={'/newDeck'} ><h3>Create a new Deck</h3></Link>
        </div>
    )
}
export default DeckSelect;