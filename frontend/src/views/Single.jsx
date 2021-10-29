import React from 'react'
import GameDeckSelect from '../components/GameDeckSelect'
import Navbar from '../components/Navbar'
const Single = props =>{
    return(
        <div className="page">
            <Navbar/>
            <div className="body">
                <h3>How to play</h3>
                <h4>The Game will begin once you click a deck below.</h4>
                <h4>Match the cards with their match until all matches have been found.</h4>
            </div>
            <GameDeckSelect route={'singlePlayer'}/>
        </div>
    )
}
export default Single