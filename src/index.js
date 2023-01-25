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
app.get('/api',(req,res)=>{
    res.send("Welcome");
})


app.listen(port,() =>{
    console.log('server is up on ' + port);
})
