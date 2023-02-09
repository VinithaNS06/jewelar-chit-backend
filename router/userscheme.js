const express     = require('express');
const UserScheme = require('../model/userscheme');
const router      =  new express.Router();


/////////////////// CREATE USER SCHEME /////////////////////////////////////
router.post('/create-userscheme',async(req,res)=>{
      const { customer_id ,scheme_id,payment_id} = req.body;
   
    try {
        const Checkuser = await UserScheme.findOne({customer_id,scheme_id});
        if (Checkuser) { return res.status(200).json({ status: false,message: 'UserScheme Already Exists' }) }
      const category = new UserScheme({
                customer_id,scheme_id,payment_id,
         })
        await category.save()
        res.status(200).send({ status: "true",message: 'UserScheme Saved',data:category})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});
/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     UserScheme.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'UserScheme Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',async (req, res) => {
    UserScheme.findByIdAndUpdate(req.params.id, {status:0}, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'UserSCheme Deleted Success',data:user})
    });
})
/////////////////////// GET USER SCHEME DATA //////////////////////

router.get("/getuserscheme",async (req, res) => {
    try {
      
        const results = await UserScheme.find({status:1}).populate(['customer_id','scheme_id','payment_id']);

        // return res.send(results)
        let Resultarray = [];
        
        for(let i = 0; i < results.length; i++){
           
            Resultarray.push({
                "_id" :  results[i]._id,
                "customer_id": results[i].customer_id._id,
                "customer_name": results[i].customer_id.name,
                "customer_Phone":results[i].customer_id.phone,
                "customer_address":results[i].customer_id.address,
                 "scheme_id" :  results[i]._id,
                "customer_scheme_name":results[i].scheme_id.scheme_name,
                "customer_scheme_code":results[i].scheme_id.scheme_code,
                "customer_scheme_duration":results[i].scheme_id.duration,
                "customer_scheme_installment":results[i].scheme_id.installment,
                "customer_scheme_paid_installment":results[i].scheme_id.paidinstallment,
                 "customer_scheme_pending_installment":results[i].scheme_id.pendinginstallment,
                "customer_scheme_amount":results[i].scheme_id.amount,
                "payment_id":results[i].payment_id._id,
                "customer_final_amount":results[i].payment_id.final_amount,
                "customer_transaction_id":results[i].payment_id.transaction_id,
                "customer_total_amount":results[i].payment_id.total_amount,
                "customer_delivery_fee":results[i].payment_id.delivery_fee,
                "customer_paymentstatus":results[i].payment_id.payment_status,
            })
        }

        // res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:results})

      res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:Resultarray})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
    
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

router.get("/:id",async (req, res) => {
    UserScheme.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate(['customer_id','scheme_id','payment_id']);

});





module.exports = router
