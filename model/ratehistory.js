const mongoose = require("mongoose");
const moment = require("moment");
const date_on = moment.utc().toDate();

const Current_date = moment().utc().format("YYYY-MM-DD ");
const RateHistorySchema = new mongoose.Schema({
  rate_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "m8it_rates",
  },
  rate: { type: Number, required: false },
  date_on: { type: String, required: false, default: Current_date },
  createdAt: { type: Date, default: Date.now },
});

const RateHistory = mongoose.model("m8it_ratehistory", RateHistorySchema);
module.exports = RateHistory;
