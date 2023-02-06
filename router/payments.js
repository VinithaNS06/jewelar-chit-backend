const express     = require('express');
const router      =  new express.Router();
const Payment        = require('../model/payments')
const authenticate = require('../middleware/auth')
// const ObjectId = require('mongodb').ObjectID;

router.post('/createpayment',async (req,res) => {
    const user_id = req.body.user_id
    const { delivery_details,payment_details,product_details,total_amount,delivery_fee,final_amount,transaction_id } = req.body
   try {
        const Checkuser = await Payment.findOne({user_id,transaction_id});
        if (Checkuser) { return res.status(200).json({ status: false,message: 'Payment Already Exists' }) }
        CountDoc = await Payment.find().exec();
    //  const  payment_id = CountDoc.length+1
      const cards = new Payment({
            user_id,delivery_details,payment_details
            ,product_details,total_amount,delivery_fee,final_amount,transaction_id
         })
        await cards.save()
        res.status(200).send({ status: "true",message: 'Payment Saved',data:cards})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
    Payment.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Payment Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id', async (req, res) => {
    Payment.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Payment Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/",async (req, res) => {
        user_id = req.body.user_id
        try {
            // execute query with page and limit values
            const results = await Payment.find();
            // get total documents in the Posts collection 
            const count = await Payment.countDocuments();
            const datalist = {
                totalHits: results.length,
                results
           }
            res.status(200).send({ status: "true",message: 'Payment List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
    Payment.find({"_id":ObjectId(req.params.id)}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Payment List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router
