import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from '@reach/router'

const Home = props =>{
    
    return(
        <div className="page">
            <Navbar/>
            <Link to={'/singlePlayer'}>
            <div className="body gameType">
                <img className="singlePlayerImage" src={`/img/onePlayer.jpg`} alt="" />
                <h3>Single Player</h3>
            </div>
            </Link>
            <Link to={'/twoPlayerLobby'}>
            <div className="body gameType">
                <img className="twoPlayerImage" src={`/img/twoPlayer.jpg`} alt="" />
                <h3>Two Player</h3>
            </div>
            </Link>
        </div>
    )
}
export default Home;