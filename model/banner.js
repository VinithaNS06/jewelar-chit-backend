const mongoose=require('mongoose');

const bannerSchema=new mongoose.Schema({
    content:{type:String},
    title:{type:String},
    subtitle:{type:String},
    image:{type:String},
    createdAt:{type: Date,default: Date.now}
});


const BannerList = mongoose.model('m8it_bannerwidth', bannerSchema);
module.exports = BannerList;