import './App.css';
import './static/css/Navbar.css'
import './static/css/Body.css'
import './static/css/Form.css'
import './static/css/EditDeck.css'
import './static/css/Pagination.css'
import './static/css/DeckSelect.css'
import './static/css/GameBoard.css'
import './static/css/Home.css'
import React, { createContext, useState, useEffect}from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'
import {Router} from '@reach/router'
import Welcome from './views/Welcome'
import Home from './views/Home'
import Profile from './views/Profile'
import NewDeck from './views/NewDeck'
import Deck from './views/Deck'
import Single from './views/Single'
import Lobby from './views/Lobby'
import Game from './views/Game';

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState({})
  const [update, setUpdate] = useState(false)
  useEffect(()=>{
    // axios.get("http://localhost:8000/api/loggedIn",{withCredentials:true})
    axios.get("/backend/api/loggedIn",{withCredentials:true})
    .then(res=>{
      setUser(res.data.user)
    })
    .catch(err=>{
      navigate("/")
    })
  },[update])

  return (
    <div className="wrapper">
      <Router>
        <Welcome path="/" setUpdate={setUpdate} update={update}/>
      </Router>
      <UserContext.Provider value={user} >
        <Router>
          <Home update={update} setUpdate={setUpdate} path="/home"/>
          <Profile path="/profile"/>
          <NewDeck path="/newDeck"/>
          <Deck path="/deck/:deckName"/>
          <Single path="/singlePlayer"/>
          <Lobby path="/twoPlayerLobby"/>
          <Game path="/game/:deckName/:players"/>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
