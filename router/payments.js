const express     = require('express');
const router      =  new express.Router()
const Rate        = require('../model/rate')
const authenticate = require('../middleware/auth');
const Payment = require('../model/payments');

router.post('/createpayment', authenticate,async (req,res) => {
       user_id = req.body.user_id;
    //   console.log(user_id)
    const { scheme,transation_id,duration,installment,amount,payment_status} = req.body
    // console.log(req)
    try {
        pay = new Payment({
            user_id,
            scheme,amount,duration,installment,transation_id ,payment_status
         })
        await pay.save()

        /* ///////////////////////////// GRAM UPDATE //////////////////////////////  */ 
        gramsvalue = await Rate.find({}).limit(1).sort({rowid: 'desc'}).populate({path:'transation_id,user_id',strictPopulate:false}).exec();
        ggrams = amount/gramsvalue[0].rate;
        Payment.findByIdAndUpdate(pay._id, {grams:ggrams}, (err, paydetails) => {
            if (err) {
                return res.status(200).send({status: "false",message: "Error",errors: err  })
            };
            res.status(200).send({ status: "true",message: 'Payment Saved',data:paydetails})
        });
        /* /////////////////////////////////////////////////////////////////////////  */ 

        
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id', async (req,res) => {
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
router.get("/getpayment",async (req, res) => {
        user_id = req.body.user_id;
        
        try {
            // execute query with page and limit values
            const results = await Payment.find({user_id}).exec();
            
            const datalist = {
                totalHits: results.length,
                results
           }
        //    console.log(datalist)
            res.status(200).send({ status: "true",message: 'Payment List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

router.get("/:id",async (req, res) => {
    scheme = req.body.scheme;;
    try {
        // execute query with page and limit values
        const results = await Payment.find({ _id: scheme}).exec();
        const datalist = {
            totalHits: results.length,
            results
       }
        res.status(200).send({ status: "true",message: 'Payment List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
router.get("/scheme/:id",async (req, res) => {
    scheme = req.params.product_id;
    console.log(scheme)
   console.log('asdgfS23RG')
    try {
         const results = await Payment.find({scheme: product_id,user_id:user_id}).exec();
        // execute query with page and limit values
        // const results = await Payment.findOne({}).exec();
      
        const datalist = {
            totalHits: results.length,
            results
       }
      console.log('adsqwxcdfcv')
        res.status(200).send({ status: "true",message: 'Payment List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});

router.put('/userschemepay/:id',async (req,res) => {
    
    Payment.findByIdAndUpdate({_id:req.params.id}, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Payment Updated Success',data:user})
    });
})
module.exports = router