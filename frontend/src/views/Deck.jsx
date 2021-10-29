import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import EditDeck from '../components/EditDeck'
import AddCard from '../components/AddCard'

const Deck = props =>{
    const [update, setUpdate] = useState(false)
    const [aspectRatio, setAspectRatio] = useState()

    const giveUpdate = u =>{
        setUpdate(!update)
    }

    return(
        <div className="page">
            <Navbar/>
            <AddCard deckName={props.deckName} giveUpdate={giveUpdate} aspectRatio={aspectRatio}/>
            <EditDeck deckName={props.deckName} giveUpdate={giveUpdate} update={update} setAspectRatio={setAspectRatio}/>
        </div>
    )
}
export default Deck;