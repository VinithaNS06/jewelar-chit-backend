const mongoose  = require('mongoose')
const moment = require('moment');
const { Decimal128, Double } = require('mongodb');
let date_now = moment.utc().toDate();
//const date_now      = Date.now();
const Current_date  = moment().utc().format('YYYY-MM-DD hh:mm:ss');

const PaymentSchema  = new mongoose.Schema({
    user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
    scheme:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes' },
    transation_id:{type: String,required: true,trim: true},
    duration:{type:Number,required:true,trim:true},
    installment:{type:Number,required:true,trim:true},
    amount:{type: Number,required: true,trim: true},
    grams:{type: Number,required: false,trim: true,default:0},
    date_on:{ type: String, required: false ,default:Current_date },
    final_amount:{type: Number,required: true,trim: true,default:0},
    payment_status:{type: String,required: false,trim: true,default:"Paid"},
    // status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
});

const Payment = mongoose.model('m8it_payments', PaymentSchema);
module.exports = Payment;