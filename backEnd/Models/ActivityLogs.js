const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actLogs = new Schema({
    Email: {
        type: String,
        required: true,
    },
    Activity: {
        type: String,
        required: true,
    },
    Details: {
        type: [String],
        required: false,
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    //remove this after tapos na
    expireAt: { 
        type: Date,
        default: Date.now,
        index: { 
            expires: '10s' 
        }
    }
});

const actLogsModel = mongoose.model("actLogs", actLogs);

module.exports = actLogsModel;