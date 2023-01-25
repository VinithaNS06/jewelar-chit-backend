const mongoose  = require('mongoose')
const CategorySchema  = new mongoose.Schema({
    name:{type: String,required: true,trim: true},
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
});

const Category = mongoose.model('m8it_categories', CategorySchema);
module.exports = Category;