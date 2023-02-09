const mongoose  = require('mongoose');
const UserSchema  = new mongoose.Schema({
  customer_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_customers' },
  scheme_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes' },
  payment_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_payment' },
  status:{type: String,default:1},
  createdAt:{type: Date,default: Date.now}
 });

const UserScheme = mongoose.model('m8it_userschemes', UserSchema);
module.exports = UserScheme;