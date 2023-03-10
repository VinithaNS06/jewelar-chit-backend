const mongoose=require('mongoose');

const bannerfullwidthSchema=new mongoose.Schema({
    content:{type:String},
    title:{type:String},
    subtitle:{type:String},
    image:{type:String},
    createdAt:{type: Date,default: Date.now}
});


const BannerFullWidth = mongoose.model('m8it_bannerlist', bannerfullwidthSchema);
module.exports = BannerFullWidth;