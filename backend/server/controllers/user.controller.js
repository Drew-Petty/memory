const User = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {secret} = require("../config/jwt")


class UserController{
    register(req, res){
        const user = new User(req.body)
        user.save()
        .then(()=>{
            res.cookie("userToken", jwt.sign({email: user.email}, secret), {httpOnly: true})
            .json({message: "successfully created user", user: user})
        })
        .catch(err=>res.json(err))
    }
    login(req, res){
        User.findOne({email: req.body.email})
        .then(user=>{
            if(user == null){
                res.json({message: "invalid email"})
            }else{
                bcrypt.compare(req.body.password, user.password)
                .then(passwordIsValid=>{
                    if(passwordIsValid){
                        res.cookie("userToken", jwt.sign({email:user.email},secret),{httpOnly:true})
                        .json({message: "success"})
                    }else{
                        res.json({message:"password incorrect"})
                    }
                })
                .catch(err=>res.json({message: "enter your password", error: err}))
            }
        })
        .catch(err=>res.json({message:"invalid login attempt", error: err}))
    }
    getLoggedIn(req, res){
        const decodedToken = jwt.decode(req.cookies.userToken, {complete:true});
        User.findOne({email:decodedToken.payload.email})
        .then(user=>res.json({user}))
        .catch(err=>res.json(err))
    }
    LogOut(req, res){
        res.cookie("userToken", jwt.sign({_id:""},secret),{httpOnly:true, maxAge:0})
        .json("logged out")
    }
    GoogleLogIn(req, res){
        User.findOne({email: req.body.email})
        .then(user=>{
            res.cookie("userToken", jwt.sign({email: user.email},secret),{httpOnly:true})
            .json({message: "success"})
        })
        .catch(err=>{
            const password = randomString()
            const confirm = password;
            const name = req.body.name;
            const email = req.body.email
            const user = new User({
                name: name,
                email: email,
                password: password,
                confirm: confirm,
            })
            user.save()
            .then(()=>{
                res.cookie("userToken", jwt.sign({email: user.email}, secret), {httpOnly: true})
                .json({message: "successfully created user", user: user})
            })
            .catch(err=>res.json(err))
        })
    }
    
}
module.exports = new UserController()

function randomString(){
    const characterArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Z','Y','Z','0','1','2','3','4','5','6','7','8','9']
    var returnArray = []
    for(var count = 0; count<10; count++){
        returnArray.push(characterArray[Math.floor(Math.random()*characterArray.length)])
    }
    return returnArray.join("")
}