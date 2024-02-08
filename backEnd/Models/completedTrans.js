const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const completedTransactions = new Schema({

  _id: { //id ng transaction
    type: String,
    required: true,
    },
  itemId: {
    type: String,
    required: true,
    },
  itemImages: {
    type: [String],
    required: true,
  },
  nameItem: {
    type: String,
    required: true,
  },
  desc:{
    type: String,
    require: true,
  },
  found:{
    type: String,
    require: true,
  },
  surrenderedBy:{
    type: String,
    require: true,
  },
  postedBy: {
    type: String,
    required: true,
    },
  datePosted:{
    type: String,
    required:true
    },
  claimedBy: {
    type: String,
    required: true,
  },
  dateClaimed: {
    type: String,
    default: Date.now,
  }
});

const completedTransactionsModelo = mongoose.model("completedTransactions", completedTransactions);

module.exports = completedTransactionsModelo;