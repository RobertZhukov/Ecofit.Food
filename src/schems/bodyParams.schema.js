const { gender, activity } = require("../constants/enum");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
  gender: {
    type: String,
    enum: Object.keys(gender),
  },
  age: Number,
  weight: Number,
  height: Number,
  activity: {
    type: String,
    enum: Object.keys(activity),
  },
});
