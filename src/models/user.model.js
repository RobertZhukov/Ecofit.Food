const {
  auth: { status, defaultStatus },
} = require("../constants/enum");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BodyParams = require("../schems/bodyParams.schema");
const Tarif = require("../schems/tarif.schema");

const UserSchema = new Schema({
  chatId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: Object.keys(status),
    default: defaultStatus,
    require: true,
  },
  tarif: Tarif,
  ordersCount: {
    type: Number,
    default: 0,
    require: true,
  },
  bodyParams: BodyParams,
  caloryCount: {
    type: Number,
  },
  feedback: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
