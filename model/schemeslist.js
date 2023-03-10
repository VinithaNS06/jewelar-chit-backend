const mongoose  = require('mongoose');


const SchemeListSchema=new mongoose.Schema({
    user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
    scheme:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes' },
    duration:{type: Number,required: true,trim: true},
    // grams:{type:String,required:true,trim:true},
    // rate:{type:String,required:true,trim:true},
    // installment:{type: Number,required: true,trim: true},
    amount:{type: Number,required: true,trim: true},
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
   
});


const SchemeList = mongoose.model('m8it_schemelist', SchemeListSchema);
module.exports = SchemeList;