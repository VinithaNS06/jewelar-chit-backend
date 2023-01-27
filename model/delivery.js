const mongoose  = require('mongoose');
const DeliverySchema  = new mongoose.Schema({
     user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
     product_id:{type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_products'},
     total_amount:{type: Number,required: true,trim: true,default:0},
     delivery_fee:{type: Number,required: true,trim: true,default:0},
     final_amount:{type: Number,required: true,trim: true,default:0},
     transaction_id:{type: String,required: true,trim: true,default:"0"},
     status:{type: String,default:0},
     createdAt:{type: Date,default: Date.now}
});





const Delivery = mongoose.model('m8it_delivery', DeliverySchema);
module.exports = Delivery;