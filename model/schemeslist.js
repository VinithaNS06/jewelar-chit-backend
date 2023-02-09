const mongoose  = require('mongoose');
const moment = require('moment');


const Current_date  = moment().utc().format('YYYY-MM-DD hh:mm:ss');

const SchemeListSchema=new mongoose.Schema({
    customer_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_customers' },
    scheme_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes' },
    date_on:{ type: String, required: false ,default:Current_date },
    status:{type: String,default:1},
    createdAt:{type: Date,default: Date.now}
});


const SchemeList = mongoose.model('m8it_schemelist', SchemeListSchema);
module.exports = SchemeList;