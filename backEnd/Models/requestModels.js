const mongoose = require('mongoose')
const schema = mongoose.Schema;


const reqSchema = new schema({
    itemId:{
        type: String,
        required: true
    },
    nameItem:{
        type: String,
        required: true
    },
    Email:{
        type: String, 
        required: true
    },
    haveBeenEmailed:{
        type: Boolean,
        required: true
    },
    dateRequested:{
        type: String,
        default: Date.now,
    }
})
const reqModelo = mongoose.model("Request", reqSchema)
module.exports = reqModelo
