const mongoose=require('mongoose');

const sliderSchema=new mongoose.Schema({
    content:{type:String},
    title:{type:String},
    subtitle:{type:String},
    image:{type:String},
    createdAt:{type: Date,default: Date.now}
});


const SliderList = mongoose.model('m8it_sliders', sliderSchema);
module.exports = SliderList;