const mongoose = require('mongoose')
const schema = mongoose.Schema;


const userSchema = new schema({
    _id:{
        type: String,
        required: true
    },
    Name:{
        type: String, 
        required: true
    },
    Email:{
        type: String, 
        required: true
    },
    Role:{
        type: String,
        required: true
    }, 
    TAC:{
        type: Boolean,
        required: true
    }

})
const userModelo = mongoose.model("users", userSchema)
module.exports = userModelo

