const mongoose  = require('mongoose')
const BranchSchema  = new mongoose.Schema({
    name:{type: String,required: true,trim: true},
    location:{type: String,required: true,trim: true},
    remark:{type: String,required: false,trim: true,default:""},
    count:{type: Number,required: false,trim: true,default:1},
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now}
});

const Branch = mongoose.model('m8it_branches', BranchSchema);
module.exports = Branch;