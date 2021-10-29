import React, { useEffect, useState, useRef, useContext } from 'react'
import io from 'socket.io-client'
import GameCard from './GameCard'
import { UserContext } from '../App'
import { navigate } from '@reach/router'

const GameBoard = props =>{
    const [socket] = useState(()=> io(":3003"))
    const [cards, setCards]= useState([])
    const [dimensions, setDimensions]=useState({})
    const [matches, setMatches]= useState([])
    const [click, setClick] = useState(true)
    const [flipped, setFlipped] = useState(null)
    const [reset, setReset] = useState(true)
    const [count, setCount] = useState(0)
    const [room, setRoom] = useState()
    const [turn, setTurn] = useState(null)
    const [score, setScore] = useState(null)
    const [leftUser, setLeftUser] = useState(null)
    const gameBoardRef = useRef()
    const user = useContext(UserContext)
    useEffect(()=>{
        if(props.players === 'singlePlayer'){
            socket.emit('startGameSingle',props.deckName)
        }
        if(props.players === 'playerOne'){
            socket.emit('newGameDouble', JSON.stringify({deckName: props.deckName, player: user}))
        }
        socket.on('roomNameDouble', room=>{
            setRoom(room)
        })
        socket.on('layoutDouble', data=>{
            let details = JSON.parse(data)
            setCards(details.layout)
            console.log(details.turn)
            setTurn(details.turn)
        })
        socket.on('quickResetDouble', data=>{
            let details = JSON.parse(data)
            setTurn(details.turn)
            setReset(current => !current)
            setFlipped(null)
            setCount(0)
        })
        socket.on('matchesDouble', data=>{
            let details = JSON.parse(data)
            setMatches(details.matches)
            setScore(details.score)
            setFlipped(null)
            setCount(0)
        })
        socket.on('resetDouble', data=>{
            let details = JSON.parse(data)
            let timer = setTimeout(()=>{
                setReset(current => !current)
                setFlipped(null)
                setCount(0)
                setTurn(details.turn)
            },1000)
            return()=>clearTimeout(timer)
        })
        socket.on('layoutSingle',layout=>{
            setCards(JSON.parse(layout))
        })
        socket.on('actionReceipt', index=>{
            setFlipped(JSON.parse(index))
            setClick(current => !current)
        })
        socket.on('matchesSingle', socketMatches=>{
            setMatches(JSON.parse(socketMatches).matches)
            setFlipped(null)
            setCount(0)
        })
        socket.on('resetSingle', string=>{
            let timer = setTimeout(()=>{
                setReset(current => !current)
                setFlipped(null)
                setCount(0)
            },1000)
            return()=>clearTimeout(timer)
        })
        socket.on('quickResetSingle', string=>{
            setReset(current => !current)
            setFlipped(null)
            setCount(0)
        })
        socket.on('complete',()=>{
            console.log('game complete')
        })
        socket.on('disconnect', err=>{
            navigate('/home')
        })
        socket.on('userLeft', disconnectedUser=>{
            setLeftUser(disconnectedUser)
        })
        return()=>socket.disconnect(true)
    },[socket, props, user])

    const gameCodeSubmitHandler = e =>{
        e.preventDefault()
        setRoom(e.target.code.value)
        socket.emit('startGameDouble', JSON.stringify({player: user, roomName: e.target.code.value}))
    }

    const action =(index)=>{
        if(count<2){
            if(turn == null){
                socket.emit('actionSingle',index)
                setCount(current=>current+1)
                return
            }
            if(turn.email===user.email){
                socket.emit('actionDouble', JSON.stringify({index: index, player:user, room: room}) )
                setCount(current=>current+1)
            }
        }
    }
    //determines card layout and card size
    useEffect(()=>{
        const handleResize = ()=>{
            const aspectRatio = cards[0].aspectRatio //need to add aspect ratio to cards
            const items = cards.length
            const height = window.innerHeight*.8
            let width = window.innerWidth*.9
            const r = aspectRatio * (height/width)
            let rows = Math.ceil(Math.sqrt(items/r))
            let columns = Math.ceil(items/rows)
            if(aspectRatio<width/height){
                let max = Math.max(rows,columns)
                rows = Math.min(rows,columns)
                columns=max
            }else{
                let max = Math.max(rows,columns)
                columns= Math.min(rows,columns)
                rows = max
            }
            let cardWidth = width/columns
            let cardHeight = height/rows
            let extras = (columns*rows)-items
            if(rows===1){
                // cardWidth = height*aspectRatio
                // width=(width-cardWidth*items)
            }else if(extras>=rows){
                let eliminatedColumns= Math.floor(extras/rows)
                cardWidth = width/columns
                width -= (cardWidth*eliminatedColumns)
                columns -= eliminatedColumns
            }
            setDimensions({
                height: height,
                width: width,
                cardHeight: cardHeight,
                cardWidth: cardWidth, 
            })
            
        }
        if(cards.length>0){
            handleResize()
            window.addEventListener('resize',handleResize)
        }
    },[cards])

    return(
        <React.Fragment>
            {cards.length === 0?
                props.players === 'playerOne' && room != null?
                    <div className='body'>
                        <h1>Please wait for player 2.</h1>
                        <h1>Your room number is {room}</h1>
                    </div>
                :
                    props.players === 'playerTwo'?
                        <div className="body">
                            <form className="form" onSubmit={gameCodeSubmitHandler}>
                                <p className="formRow">
                                    <label htmlFor="code">Game Code:</label>
                                    <input type="text" name="code"/>
                                </p>
                                <input className="button" type="submit" value="Join Game"/>
                            </form>
                        </div>
                    :
                        ''
                //return to home

                // navigate('/home')
                :
                    <div className="body">
                        {turn?<h3>It is {turn.name}'s turn.</h3>:""}
                        {score?<h3>{score}</h3>:""}
                        {leftUser?<h3>{leftUser} has left the game</h3>:''}
                        <div className="gameBoard" ref={gameBoardRef} style={{height:`${dimensions.height}px`,width:`${dimensions.width}px`}}>
                            {cards.map((card, i)=>{
                                return(<GameCard card={card} key={i} index={i} dimensions={dimensions} action={action} matches={matches} flipped={flipped} setFlipped={setFlipped} reset={reset} click={click}/>)
                            })}
                        </div>
                    </div>
            }
        </React.Fragment>
        )
}
export default GameBoard