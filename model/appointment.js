const mongoose  = require('mongoose')
const AppointmentSchema  = new mongoose.Schema({
    user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
    staff_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_staffs' },
    product_id:{type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_products'},
    Products:{ type: String,required: true,default:"" },
    appointment_mode:{type:String,required: true,default:"Web-mode"},
    date:{type: String,required: true,trim: true},
    time:{type: String,required: true,trim: true},
    schedule_status:{type: String,default:"Pending"},
    status:{type: String,default:1},
    createdAt:{type: Date,default: Date.now}
});

const Appointment = mongoose.model('m8it_schedule', AppointmentSchema);
module.exports = Appointment;