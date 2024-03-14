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
        type: Object,
        required: false,
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    //remove this after tapos na
    expireAt: { 
        type: Date,
        default: function () {
            return new Date(Date.now() + 960000); // 960 seconds = 960000 milliseconds
        },
        index: {
            expires: '960s',
        },
    }
});

const actLogsModel = mongoose.model("actLogs", actLogs);

module.exports = actLogsModel;