const mongoose  = require('mongoose');
const UserSchema  = new mongoose.Schema({
  user_id:{ type:mongoose.Schema.Types.ObjectId,required: true,ref:'m8it_users' },
  scheme_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes'},
  transaction_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_transaction'},
  status:{type: String,default:1},
  createdAt:{type: Date,default: Date.now}
 });

const UserScheme = mongoose.model('m8it_userschemes', UserSchema);
module.exports = UserScheme;