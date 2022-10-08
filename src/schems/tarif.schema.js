const { tarif } = require('../constants/enum');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  tarifName: {
    type: String,
    enum: Object.keys(tarif),
  },
  tarifStart: {
    type: Date,  
  },
  tarifEnd: {
    type: Date,
  },
})
