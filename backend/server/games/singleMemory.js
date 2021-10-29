const Card = require("../models/card.model")

class SingleMemory{

    constructor(deckName){
        this.deckName = deckName
        this.cards = []
        this.matches=[]
        this.cardOne = null
        this.cardOneIndex = null
        this.complete = false
    }
    setCards(){
        return new Promise((resolve)=>{
            Card.find({deckName:this.deckName})
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
                resolve('cards are set')
            })
            .catch(err=>{
                resolve('cards not set'+err)
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
        if(actionCard===this.cardOne){
            this.matches.push(index, this.cardOneIndex)
            this.cardOne = null
            this.cardOneIndex = null
            //check if all cards have been matched
            if(this.matches.length === this.cards.length){
                this.complete=true
            }
            return
        }else{
            this.cardOne = null
            this.cardOneIndex = null
            return
        }
    }   
    flipBack(){
        this.cardOne = null
        this.cardOneIndex = null
        return
    }
}
module.exports = SingleMemory