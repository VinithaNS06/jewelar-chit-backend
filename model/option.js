const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Option = mongoose.model("m8it_options", optionSchema);
module.exports = Option;
