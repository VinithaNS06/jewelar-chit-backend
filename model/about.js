const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  experience: { type: Number },
  image: { type: String },
  buttonname: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const AboutList = mongoose.model("m8it_aboutlists", aboutSchema);
module.exports = AboutList;
