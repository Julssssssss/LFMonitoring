const mongoose = require('mongoose')
const schema = mongoose.Schema;


const refreshTokensSchema = new schema({
    Email:{
        type: String, 
        required: true
    },
    refreshToken:{
        type: String, 
        required: true
    },
    expireAt: { 
        type: Date,
        default: Date.now,
        index: { 
            expires: '960s' 
        }
    }
})
const refreshTokensModelo = mongoose.model("refreshTokens", refreshTokensSchema)
module.exports = refreshTokensModelo