const UserController = require("../controllers/user.controller")
const {authenticate} = require("../config/jwt")

module.exports = app =>{
    app.post("/api/register", UserController.register)
    app.post("/api/login", UserController.login)
    app.get("/api/loggedIn", authenticate, UserController.getLoggedIn)
    app.get("/api/logout", UserController.LogOut)
    app.post("/api/googleLogIn", UserController.GoogleLogIn)
}