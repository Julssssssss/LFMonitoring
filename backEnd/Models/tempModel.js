const mongoose = require('mongoose')
const schema = mongoose.Schema;


const tempSchema = new schema({
    _id:{
        type: String, 
        required: true
    },
    Email:{
        type: String, 
        required: true
    }
})
const tempModelo = mongoose.model("Tempo", tempSchema)
module.exports = tempModelo