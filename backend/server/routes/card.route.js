const CardController = require("../controllers/card.controller")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./server/public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage: storage})

module.exports = app =>{
    app.post("/api/card/create", upload.single("file"), CardController.createCard)
    app.get("/api/card/deckNames", CardController.getDeckNames)
    app.get("/api/card/deck/:deckName", CardController.getDeck)
    app.get("/api/card/deckSet/:deckName/:page", CardController.getDeckPage)
    app.get("/api/card/topCardSet/all/:page", CardController.getDeckTopCardPage)
    app.get("/api/card/topCardSet/:email/:page", CardController.getDeckTopCardPageByEmail)
    app.delete("/api/card/delete/:fileName", CardController.deleteCard)
}