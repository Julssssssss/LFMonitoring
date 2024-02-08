const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const items = new Schema({
  url: {
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
  datePosted: {
    type: String,
    default: Date.now,
  },
  approved:{
    type: Boolean,
    require: true,
  },
  
});

const itemModelo = mongoose.model("items", items);

module.exports = itemModelo;