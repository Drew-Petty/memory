require("./server/config/mongoose.config");
const express = require('express');
const cookies = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3003
const cors = require('cors');
const { makeId } = require("./server/utils/game.util");
const SingleMemory = require("./server/games/singleMemory");
const DoubleMemory = require("./server/games/doubleMemory");
app.use(cors())
app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookies());
require('./server/routes/user.route')(app)
require('./server/routes/card.route')(app)

app.use(express.static('./server/public'))


const server = app.listen(port, ()=>console.log(`running on port ${port}`))
const io = require("socket.io")(server, {cors: true})

const state = {}
const rooms = {}


io.on('connection', socket =>{
    console.log('connection')
    socket.on('startGameSingle', handleStartGameSingle);
    socket.on('actionSingle', handleActionSingle);
    socket.on('newGameDouble', handleNewGameDouble);
    socket.on('startGameDouble', handleStartGameDouble)
    socket.on('actionDouble', handleActionDouble)
    socket.on('disconnect', handleDisconnect)

    function handleDisconnect(){
        roomName = rooms[socket.id]
        if(socket.number === 1 && state[roomName]){
            let disconnectedUser = state[roomName].playerOne.name
            emitDisconnect(roomName, disconnectedUser)
        }
        if(socket.number === 2 && state[roomName]){
            let disconnectedUser = state[roomName].playerTwo.name
            emitDisconnect(roomName, disconnectedUser)
        }
        rooms[socket.id]=null
        state[roomName]=null
    }
    function handleStartGameDouble(data){
        const details = JSON.parse(data)
        let roomName = details.roomName
        rooms[socket.id]=roomName
        socket.join(roomName.toString())
        socket.number = 2
        doubleMemory = state[roomName]
        if(doubleMemory==null){
            //no player 1
            console.log('no player 1')
            return
        }
        doubleMemory.joinAndSetCards(details.player).then(message=>{
            emitGameLayoutDouble(roomName, doubleMemory.turn, doubleMemory.cards)
        })
    }
    function handleNewGameDouble(data){
        const details = JSON.parse(data)
        let roomName = makeId(6)
        rooms[socket.id]=roomName
        socket.join(roomName.toString())
        socket.number = 1
        state[roomName]=new DoubleMemory(details.deckName, details.player)
        emitGameRoomDouble(roomName)
    }
    function handleActionDouble(data){
        const details = JSON.parse(data)
        const roomName = details.room
        emitActionReceipt(roomName, details.index)
        const doubleMemory = state[roomName]
        let matchNumber = doubleMemory.matches.length
        if(doubleMemory.cardOneIndex === details.index){
            doubleMemory.changeTurn()
            doubleMemory.flipBack()
            emitQuickResetDouble(roomName, doubleMemory.turn)
            return
        }
        doubleMemory.flip(details.index, details.player)
        if(doubleMemory.matches.length>matchNumber){
            emitMatchesDouble(roomName, doubleMemory.matches, doubleMemory.getScore())
            if(doubleMemory.complete){
                emitComplete(roomName)
            }
            return
        }
        if(doubleMemory.cardOne==null){
            emitResetDouble(roomName, doubleMemory.turn)
        }
    }

    function handleStartGameSingle(deckName){
        let roomName = makeId(6)
        rooms[socket.id]=roomName;
        socket.join(roomName)
        state[roomName]= new SingleMemory(deckName)
        state[roomName].setCards().then(message=>{
            emitGameLayoutSingle(roomName,state[roomName].cards)
        })
    }
    function handleActionSingle(index){
        const roomName = rooms[socket.id]
        emitActionReceipt(roomName, index)
        const singleMemory = state[roomName]
        const matchNumber = singleMemory.matches.length
        if(singleMemory.cardOneIndex === index){
            singleMemory.flipBack()
            emitQuickResetSingle(roomName)
            return
        }
        singleMemory.flip(index)
        if(singleMemory.matches.length>matchNumber){
            emitMatchesSingle(roomName, singleMemory.matches)
            if(singleMemory.complete){
                emitComplete(roomName)
            }
            return
        }
        
        if(singleMemory.cardOne == null){
            emitResetSingle(roomName)
        }
    }
    function emitGameLayoutSingle(room, layout){
        io.sockets.in(room).emit('layoutSingle', JSON.stringify(layout))
    }
    function emitActionReceipt(room, index){
        io.sockets.in(room)
        .emit('actionReceipt', JSON.stringify(index))
    }
    function emitMatchesSingle(room, matches){
        io.sockets.in(room)
        .emit('matchesSingle', JSON.stringify({matches}))
    }
    function emitQuickResetSingle(room){
        io.sockets.in(room).emit('quickResetSingle','quickReset')
    }
    function emitResetSingle(room){
        io.sockets.in(room).emit('resetSingle','reset')
    }
    function emitComplete(room){
        io.sockets.in(room).emit('complete', 'complete')
    }
    function emitGameRoomDouble(room){
        io.sockets.in(room)
        .emit('roomNameDouble', room)
    }    
    function emitGameLayoutDouble(room, turn, layout){
        io.sockets.to(room).emit('layoutDouble', JSON.stringify({turn: turn, layout: layout}))
    }
    function emitQuickResetDouble(room, turn){
        io.sockets.in(room).emit('quickResetSingle', JSON.stringify({turn: turn}))
    }
    function emitMatchesDouble(room, matches, score){
        io.sockets.in(room).emit('matchesDouble', JSON.stringify({matches: matches, score: score}))
    }
    function emitResetDouble(room, turn){
        io.sockets.in(room).emit('resetDouble', JSON.stringify({turn: turn}))
    }
    function emitDisconnect(room, formerUser){
        io.sockets.in(room).emit('userLeft', formerUser)
    }
})