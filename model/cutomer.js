const mongoose  = require('mongoose')
const CustomerSchema  = new mongoose.Schema({
    // scheme_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes' },
    // product_id:{type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_products'},
    name:{type:String,required: true,trim:true},
    email:{type:String,required:true,trim:true},
    phone:{type:Number,required:true,trim:true},
    address:{type:String,required:true,trim:true},
    status:{type: String,default:1},
    createdAt:{type: Date,default: Date.now}
});

const Customer = mongoose.model('m8it_customers', CustomerSchema);
module.exports = Customer;