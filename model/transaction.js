const mongoose  = require('mongoose')
const moment = require('moment');
const { Decimal128, Double } = require('mongodb');
let date_now = moment.utc().toDate();
const Current_date  = moment().utc().format('YYYY-MM-DD hh:mm:ss');


const TransactionSchema  = new mongoose.Schema({
    user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
    scheme:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes' },
    transaction_id:{type: String,required: true,trim: true},
    amount:{type: Number,required: true,trim: true},
    grams:{type: Number,required: false,trim: true,default:0},
    date_on:{ type: String, required: false ,default:Current_date },
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
});

const Transaction = mongoose.model('m8it_transaction', TransactionSchema);
module.exports = Transaction;