const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const TestimonialList = mongoose.model("m8it_testimonials", testimonialSchema);
module.exports = TestimonialList;
