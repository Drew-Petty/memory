const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "please enter a valid email",
        },
        unique: [true, "Email already registered"],
    },
    password:{
        type:String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
    }
},{timestamps: true});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("confirm")
.get(()=>this.confirm)
.set(value =>this.confirm = value)

UserSchema.pre("validate", function(next){
    if(this.password != this.confirm){
        this.invalidate("confirm", "password must match confirmation password")
    }
    next()
})

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
    .then(hash=>{
        this.password = hash
        next()
    })
    .catch(err=>{
        console.log("hashing password didn't work", err)
        next()
    })
})

const User = mongoose.model("User", UserSchema)
module.exports = User;