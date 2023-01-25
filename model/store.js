const mongoose  = require('mongoose')
const StoreSchema  = new mongoose.Schema({
    user_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_users' },
    product_id:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'m8it_products' },
    qty:{type: Number,required: true,trim: true},
    status:{type: String,default:0},
    createdAt:{type: Date,default: Date.now},
});

const Store = mongoose.model('m8it_storetry', StoreSchema);
module.exports = Store;