const mongoose = require("mongoose");
const RateListSchema = new mongoose.Schema({
  type: { type: String, required: false, default: "Gold" },
  rate: { type: Number, required: false },
  carat: { type: Number, required: false },
  status: { type: String, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const RateList = mongoose.model("m8it_ratelist", RateListSchema);
module.exports = RateList;
