import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import GameDeckSelect from '../components/GameDeckSelect'
import { navigate } from '@reach/router'

const Template = props =>{
    const [newGame, setNewGame] = useState(false)

    const joinGameHandler = e =>{
        navigate(`/game/deckName/playerTwo`)
    }

    const newGameHandler= e=>{
        setNewGame(!newGame)
    }
    return(
        <div className="page">
            <Navbar/>
            {!newGame?
            <div className="body">
                <button onClick={newGameHandler}><h1>Start a new game?</h1></button>
                <button onClick={joinGameHandler}><h1>Join Game with Code.</h1></button>
            </div>
            :
            <GameDeckSelect route={'playerOne'}/>
            }
        </div>
        )
}
export default Template