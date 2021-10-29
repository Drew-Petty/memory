const Card = require("../models/card.model")
const fs = require("fs")
const cardPath = "./client/public/uploads/"
const LIMIT = 6;

class CardController{
    createCard(req, res){
        const card = new Card({
            email: req.body.email,
            deckName: req.body.deckName,
            fileName: req.file.filename,
            aspectRatio: req.body.aspectRatio,
        })
        card.save()
        .then(newCard=>{
            res.json({card: newCard})})
        .catch(err => res.json({message: "something went wrong when adding a card", error: err}))
    }
    getDeckNames(req, res){
        Card.find().distinct('deckName')
        .then(names=>{
            res.json({names: names})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    getDeck(req,res){
        Card.find({deckName: req.params.deckName})
        .then(cards=> res.json({deck: cards}))
        .catch(err=>res.json({message: "something went wrong when trying to get the deck", error: err}))
    }
    getDeckPage(req, res){
        Card.find({deckName:req.params.deckName}).sort('-createdAt')
        .then(cards=>{
            const totalPages = Math.ceil(cards.length/LIMIT)
            const start = (req.params.page-1)*LIMIT
            cards = cards.slice(start,start+LIMIT)
            res.json({deckSet:cards, totalPages:totalPages})
        })
        .catch(err=>res.json({message: "something went wrong when trying to get the deck set", error: err}))
    }
    getDeckTopCardPageByEmail(req, res){
        Card.find({email:req.params.email}).distinct('deckName')
        .then(deckNames=>{
            Card.find({email:req.params.email})
            .then(cards=>{
                let documents = []
                for(let deckName of deckNames){
                    for(let card of cards){
                        if(card.deckName == deckName){
                            documents.push(card)
                            break
                        }
                    }
                }
                const totalPages = Math.ceil(documents.length/LIMIT)
                const start = (req.params.page-1)*LIMIT
                documents = documents.slice(start,start+LIMIT)
                res.json({deckTopCards: documents, totalPages: totalPages})
            })
        })
    }
    getDeckTopCardPage(req, res){
        Card.find().distinct('deckName')
        .then(deckNames=>{
            Card.find()
            .then(cards=>{
                let documents = []
                for(let deckName of deckNames){
                    for(let card of cards){
                        if(card.deckName == deckName){
                            documents.push(card)
                            break
                        }
                    }
                }
                const totalPages = Math.ceil(documents.length/LIMIT)
                const start = (req.params.page-1)*LIMIT
                documents = documents.slice(start, start+LIMIT)
                res.json({deckTopCards: documents, totalPages: totalPages})
            })
        })
    }
    deleteCard(req,res){
        if(fs.existsSync(cardPath+req.params.fileName)){
            fs.unlinkSync(cardPath+req.params.fileName)
        }
        Card.deleteOne({fileName: req.params.fileName})
        .then(res.json({message: "delete successful"}))
        .catch(err=>res.json({message: "something went wrong when deleting a card from the DB", error: err}))
    }
}
module.exports = new CardController()