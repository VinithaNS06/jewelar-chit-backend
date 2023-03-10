const mongoose  = require('mongoose')
const SettingSchema = new mongoose.Schema({
    pagename:{type:String,req:true,trim:true},
    // shrtDesc:{type:String,req:true,trim:true},
    Desc:{type:String,req:true,trim:true},
    status:{type: String,default:1},
    createdAt:{type: Date,default: Date.now}
})
const Setting = mongoose.model('m8it_settings', SettingSchema);
module.exports = Setting;