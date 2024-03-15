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
        default: function () {
            return new Date(Date.now() + 960000); // 960 seconds = 960000 milliseconds
        },
        index: {
            expires: '960s',
        },
    }    
})
const refreshTokensModelo = mongoose.model("refreshTokens", refreshTokensSchema)
module.exports = refreshTokensModelo