import axios from 'axios'
import React, {useEffect, useState}from 'react'
import GameSelect from './GameSelect'
import Pagination from './Pagination'

const GameDeckSelect = props =>{
    const [deckTopCards, setDeckTopCards] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages]= useState(1)

    useEffect(()=>{
        // axios.get(`http://localhost:8000/api/card/topCardSet/all/${page}`)
        axios.get(`/backend/api/card/topCardSet/all/${page}`)
        .then(res=>{
            setDeckTopCards(res.data.deckTopCards)
            setTotalPages(res.data.totalPages)
        })
    },[page])

    return(
        <div className="body">
            <div className="paginatedItems">
                {deckTopCards.map((topCard, i)=>{
                    return(
                        <GameSelect route={props.route} topCard={topCard} key={i}/>
                    )
                })}
            </div>
            <Pagination setPage={setPage} page={page} totalPages={totalPages}/>
        </div>
        )
}
export default GameDeckSelect