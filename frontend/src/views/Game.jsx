
import Navbar from '../components/Navbar'
import GameBoard from '../components/GameBoard'

const Game = props =>{

    return(
        <div className="page">
            <Navbar/>
            <GameBoard deckName={props.deckName} players={props.players} room={props.room}/>
        </div>
        )
}
export default Game