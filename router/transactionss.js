const express     = require('express');
const router      =  new express.Router()
// const Payments        = require('../model/payment')
const Rate        = require('../model/rate')
const authenticate = require('../middleware/auth');
const Transaction = require('../model/transaction');

router.post('/createtrans', async (req,res) => {
       
    //   console.log(user_id)
    const { user_id,scheme,transaction_id,amount} = req.body
    
    try {
        pay = new Transaction({
            user_id,
            scheme,transaction_id,amount
         })
        await pay.save()

        /* ///////////////////////////// GRAM UPDATE //////////////////////////////  */ 
        gramsvalue = await Rate.find({}).limit(1).sort({rowid: 'desc'}).populate({path: 'transaction_id,user_id'});
        ggrams = amount/gramsvalue[0].rate;
        Payments.findByIdAndUpdate(pay._id, {grams:ggrams}, (err, paydetails) => {
            if (err) {
                return res.status(200).send({status: "false",message: "Error",errors: err  })
            };
            res.status(200).send({ status: "true",message: 'Payments Saved',data:paydetails})
        });
        /* /////////////////////////////////////////////////////////////////////////  */ 

        
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id', async (req,res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Payments Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id', async (req, res) => {
    Transaction.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Payments Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/",async (req, res) => {
        user_id = req.body.user_id;
        
        try {
            // execute query with page and limit values
            const results = await Transaction.find({user_id}).exec();
            
            const datalist = {
                totalHits: results.length,
                results
           }
           console.log(datalist)
            res.status(200).send({ status: "true",message: 'Payments List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

router.get("/:id",async (req, res) => {
    productid = req.body.productid;;
    try {
        // execute query with page and limit values
        const results = await Transaction.find({ _id: productid}).exec();
        const datalist = {
            totalHits: results.length,
            results
       }
        res.status(200).send({ status: "true",message: 'Payments List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
router.get("/scheme/:id",async (req, res) => {
    productid = req.body.productid;
   
    try {
        //  const results = await Payments.find({ user_id:req.user.id,scheme: product_id}).exec();
        // execute query with page and limit values
        const results = await Transaction.findOne({}).exec();
      
        const datalist = {
            totalHits: results.length,
            results
       }
      
        res.status(200).send({ status: "true",message: 'Payments List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});


module.exports = router