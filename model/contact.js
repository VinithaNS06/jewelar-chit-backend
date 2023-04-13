const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  mobilenum: { type: Number },
  whatsappnum: { type: Number, required: true },
  address: { type: String, required: true },
  fburl: { type: String, required: true },
  instaurl: { type: String, required: true },
  whatsappurl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactList = mongoose.model("m8it_contactlists", contactSchema);
module.exports = ContactList;
