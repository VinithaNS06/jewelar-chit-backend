const mongoose  = require('mongoose')
const RateSchema  = new mongoose.Schema({
    rowid:{ type:Number,required: true},
    type:{ type:String,required: false,default:'Gold'},
    rate:{ type:Number,required: false},
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
});

const Rate = mongoose.model('m8it_rates', RateSchema);
module.exports = Rate;