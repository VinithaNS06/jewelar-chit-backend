const mongoose  = require('mongoose')
const SchemeSchema  = new mongoose.Schema({
    scheme_code:{type:String,required:true},
    scheme_name:{ type:String,required: true,trim:true},
    scheme_desc:{ type:String,required: false,trim:true},
    duration:{type: Number,required: true,trim: true},
    installment:{type: Number,required: true,trim: true},
    totalinstallment:{type: Number,required: true,trim: true},
    paidinstallment:{type: Number,required: true,trim: true},
    pendinginstallment:{type: Number,required: true,trim: true},
    amount:{type: Number,required: true,trim: true},
    min_amount:{type: Number,required: true,trim: true},
    max_amount:{type: Number,required: true,trim: true},
    rate:{type:String,required: true,default:""},
    grams:{type:String,required: true,default:""},
    amountstepup:{type:Number,required:true},
    product_status:{ type:String,required: false},
    status:{type: String,default:""},
    createdAt:{type: Date,default: Date.now}
});

const Schemes = mongoose.model('m8it_schemes', SchemeSchema);
module.exports = Schemes;