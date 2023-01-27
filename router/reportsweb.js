const express     = require('express');
const router      =  new express.Router()
const authenticate = require('../middleware/auth');
const Payment = require('../model/payments');
const User        = require('../model/user')


router.get("/userlist/:id",async (req, res) => {
    let user_id = req.params.id;
    if(user_id!=0){
            filter = { _id : user_id}
    }else{
            filter = {}
    }

    try {
        // execute query with page and limit values
        const results = await User.find(filter).exec();
        res.status(200).send({ status: "true",message: 'Users List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
router.get("/orderlist/:id",async (req, res) => {
    let user_id = req.params.id;
    if(user_id!=0){
            filter = { _id : user_id}
    }else{
            filter = {}
    }   
     
    try {
        // execute query with page and limit values
        const results = await Payment.find({}).populate('user_id').exec();
        res.status(200).send({ status: "true",message: 'Users List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
router.post("/orderlist/:id",async (req, res) => {
    let user_id = req.params.id;
    if(user_id!=0){
        Payment.findByIdAndUpdate(user_id, req.body, (err, user) => {
            if (err) {
                return res.status(200).send({status: "false",message: "Error",errors: err  })
            };
            res.status(200).send({ status: "true",message: 'Order Updated Success',data:user})
        });
    }else{
        res.status(200).send({ status: "false",message: 'Updated ID Missing', data:err})
    }   
});
module.exports = router