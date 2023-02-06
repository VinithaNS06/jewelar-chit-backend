const mongoose=require("mongoose");

const StaffSchema=new mongoose.Schema({
    name:{type: String,required: true,trim: true},
    staffid:{type: String,required: false,trim: true,default:0},
    comments:{type: String,required: false,trim: true,default:0},
    status:{type: String,default:1},
    createdAt:{type: Date,default: Date.now}
});   
const Staff = mongoose.model('m8it_staffs', StaffSchema);
module.exports = Staff;