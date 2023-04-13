const mongoose = require("mongoose");

const optionListSchema = new mongoose.Schema({
  order: { type: Number },
  title: { type: String },
  content: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const OptionList = mongoose.model("m8it_optionlists", optionListSchema);
module.exports = OptionList;
