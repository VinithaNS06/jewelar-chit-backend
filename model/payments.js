const mongoose  = require('mongoose')
const paymentSchema  = new mongoose.Schema({
    user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
    Payment_id:{type: Number,required: true,trim: true,default:0},
    delivery_details:{type: String,required: true,trim: true,default:""},
    payment_details:{type: String,required: true,trim: true,default:""},
    product_details:{type: String,required: true,trim: true,default:""},
    total_amount:{type: Number,required: true,trim: true,default:0},
    delivery_fee:{type: Number,required: true,trim: true,default:0},
    final_amount:{type: Number,required: true,trim: true,default:0},
    transaction_id:{type: String,required: true,trim: true,default:"0"},
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
});

const Payment = mongoose.model('m8it_payment', paymentSchema);
module.exports = Payment;