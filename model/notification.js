const mongoose  = require('mongoose')
const NotificationSchema = new mongoose.Schema({
    notifyname:{type:String,req:true,trim:true},
    description:{type:String,req:true,trim:true},
    status:{type: String,default:1},
    createdAt:{type: Date,default: Date.now}
})
const Notification = mongoose.model('m8it_notifications', NotificationSchema);
module.exports = Notification;