const mongoose  = require('mongoose');
const moment = require('moment');
// const Current_date  = moment().utc().format('YYYY-MM-DD hh:mm:ss');
const InvoiceSchema  = new mongoose.Schema({
   invoiceNo:{type:String,required: true,trim: true},
   branch_id:{type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_branches'},
   customer_id:{type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_customers'},
   scheme_id:{type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_schemes'},
   status:{type: String,default:1},
   createdAt:{type: Date,default: Date.now}
})

const Invoice = mongoose.model('m8it_invoices', InvoiceSchema);
module.exports = Invoice;
