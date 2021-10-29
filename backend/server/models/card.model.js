const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "uploader email required"]
    },
    deckName:{
        type:String,
        required:[true,"card needs a deck"]
    },
    fileName:{
        type:String,
        required:[true, "file needs a name"]
    },
    aspectRatio:{
        type: Number,
        required:[true, "image needs an aspect ratio"]
    }
},{timestamps: true})
const Card = mongoose.model("Card", CardSchema)
module.exports = Card