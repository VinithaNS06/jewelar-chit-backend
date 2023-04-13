const mongoose = require("mongoose");
const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, trim: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "m8it_categories",
  },
  status: { type: String, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const SubCategory = mongoose.model("m8it_subcategories", SubCategorySchema);
module.exports = SubCategory;
