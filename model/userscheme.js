const mongoose = require("mongoose");
const moment = require("moment");
const { Decimal128, Double } = require("mongodb");
let date_now = moment.utc().toDate();
//const date_now      = Date.now();
const Current_date = moment().utc().format("YYYY-MM-DD hh:mm:ss");
const UserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "m8it_users",
  },
  scheme: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "m8it_schemes",
  },
  transation_id: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, trim: true },
  // grams:{type: Number,required: false,trim: true,default:0},
  // rate:{type: Number,required: false,trim: true,default:0},
  payment_status: {
    type: String,
    required: false,
    trim: true,
    default: "Paid",
  },
  date_on: { type: String, required: false, default: Current_date },
  is_paid: { type: String, required: false, default: 0 },
  status: { type: String, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const UserScheme = mongoose.model("m8it_userschemes", UserSchema);
module.exports = UserScheme;
