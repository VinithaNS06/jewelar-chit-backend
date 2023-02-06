const express     = require('express')
const cors = require('cors')
const userRoutes=require("../router/user");
const appointmentRoutes=require("../router/appointment");
const categoryRoutes=require("../router/category");
const schemeRoutes=require("../router/scheme");
const productRoutes=require("../router/products");
const paymentRoutes=require("../router/payments");
const rateRoutes=require("../router/rate");
const userschemeRoutes=require("../router/userscheme");
const deliveryRoutes=require("../router/delivery");
const staffRoutes=require("../router/staff");
const transactionRoutes=require("../router/transaction");
const uploadController = require('../router/upload');
const webreportController = require('../router/reportsweb');
const branchRoutes = require('../router/branch');
const storetryRoutes=require("../router/storetry");
const orderRoutes=require("../router/order");
const rateHistoryRoutes=require("../router/ratehistory");
const customerRoutes=require("../router/customer");
const schemeListRoutes=require("../router/schemelist");
const transcactionsRoutes=require("../router/transactionss");
const InitiateMongoServer = require('../db/mongoose');
InitiateMongoServer()
const app   = express();
const port  =  process.env.PORT || 3012
app.use(cors())
app.use(express.json())
app.use(express.static('storage'));


app.use("/api/users",userRoutes);
app.use("/api/schedule",appointmentRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/schemes",schemeRoutes);
app.use("/api/products",productRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/rates",rateRoutes);
app.use("/api/userscheme",userschemeRoutes);
app.use("/api/delivery",deliveryRoutes);
app.use("/api/staff",staffRoutes);
app.use("/api/transaction",transactionRoutes);
app.use('/api/upload',uploadController);
app.use('/api/webreport',webreportController);
app.use('/api/branch',branchRoutes);
app.use('/api/storetry',storetryRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/ratehistory",rateHistoryRoutes);
app.use("/api/customers",customerRoutes);
app.use("/api/schemelist",schemeListRoutes);
app.use("/api/transactions",transcactionsRoutes);
app.get('/api',(req,res)=>{
    res.send("Welcome");
})


app.listen(port,() =>{
    console.log('server is up on ' + port);
})
