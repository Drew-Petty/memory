const Card = require("../models/card.model")
class DoubleMemory{

    constructor(deckName, playerOne){
        this.deckName = deckName
        this.playerOne = playerOne
        this.cards = [];
        this.matches =[];
        this.cardOne = null
        this.cardOneIndex = null
        this.complete = false
        this.playerTwo = null
        this.playerOneScore = 0
        this.playerTwoScore = 0
        this.turn = null
    }
    joinAndSetCards(playerTwo){
        return new Promise((resolve)=>{
            Card.find({deckName: this.deckName})
            .then(cards=>{
                //double the cards
                for(let card of cards){
                    this.cards.push(card, card)
                }
                //shuffle cards
                for(let i=0; i<this.cards.length;i++){
                    let random = Math.floor(Math.random()*this.cards.length)
                    let temp = this.cards[i]
                    this.cards[i] = this.cards[random]
                    this.cards[random] = temp;
                }
                this.playerTwo = playerTwo
                this.turn = this.playerOne;
                resolve('cards are set')
            })
            .catch(err=>{
                resolve('cards not set '+err)
            })
        })
    }
    flip(index){
        //check if this is the the first card to be flipped
        if(this.cardOne===null){
            this.cardOneIndex = index;
            this.cardOne = this.cards[index]
            return 
        }
        //set actionCard variable and check against cardOne to determine if it's a match
        const actionCard = this.cards[index]
        if(this.cardOne === actionCard){
            this.matches.push(index, this.cardOneIndex)
            if(this.playerOne === this.turn){
                this.playerOneScore++ 
            }else{
                this.playerTwoScore++
            }
            this.flipBack()
            if(this.matches.length === this.cards.length){
                this.complete=true
            }
            return
        }else{
            this.changeTurn()
            this.flipBack()
            return
        }
    }
    changeTurn(){
        if(this.turn.email == this.playerOne.email){
            this.turn = this.playerTwo
        }else{
            this.turn = this.playerOne
        }
        return
    }
    flipBack(){
        this.cardOne = null
        this.cardOneIndex = null
        return
    }
    getScore(){
        return this.playerOne.name + ': ' + this.playerOneScore + "   " + this.playerTwo.name + ": " +this.playerTwoScore
    }
}
module.exports = DoubleMemory