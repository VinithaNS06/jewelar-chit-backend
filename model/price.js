const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  min_price: { type: Number, require: true },
  max_price: { type: Number, require: true },
  createdAt: { type: Date, default: Date.now },
});
const PriceList = mongoose.model("m8it_pricelists", priceSchema);
module.exports = PriceList;
