const mongoose  = require('mongoose');
const moment = require('moment');
let date_now = moment.utc().toDate();

const Current_date  = moment().utc().format('YYYY-MM-DD hh:mm:ss');
const orderSchema  = new mongoose.Schema({
    user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
    product_id:{type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_products'},
    date_on:{ type: String, required: false ,default:Current_date },
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
});

const Order = mongoose.model('m8it_orders', orderSchema);
module.exports = Order;