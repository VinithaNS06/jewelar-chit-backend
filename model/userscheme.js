const mongoose  = require('mongoose');
const UserSchema  = new mongoose.Schema({
  user_id:{ type:mongoose.Schema.Types.ObjectId,required: true,ref:'m8it_users' },
  scheme_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes'},
 });

const UserScheme = mongoose.model('m8it_userschemes', UserSchema);
module.exports = UserScheme;