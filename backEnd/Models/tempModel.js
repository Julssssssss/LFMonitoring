const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temp = new Schema({
  _id: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  }
});

const tempModel = mongoose.model("tempos", temp);

module.exports = tempModel;