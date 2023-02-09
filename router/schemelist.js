const express     = require('express');
const router      =  new express.Router();
const authenticate = require('../middleware/auth');

const SchemeList = require('../model/schemeslist');

router.post('/schemelist',async (req,res) => {
    
    const { customer_id ,scheme_id,date_on,status} = req.body;
   
    try {
        const Checkuser = await SchemeList.findOne({customer_id,scheme_id});
        if (Checkuser) { return res.status(200).json({ status: false,message: 'Schemelist Already Exists' }) }
      const category = new SchemeList({
                customer_id,scheme_id,date_on,status,
         })
        await category.save()
        res.status(200).send({ status: "true",message: 'SchemeList Saved',data:category})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});
/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     SchemeList.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Category Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',async (req, res) => {
    SchemeList.findByIdAndUpdate(req.params.id, {status:0}, (err, user)=> {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Category Deleted Success',data:user})
    });
})

/////////////////////// GET SCHEME DATA //////////////////////

router.get("/getschemelist",async (req, res) => {
    try {
      
        const results = await SchemeList.find().populate(['customer_id','scheme_id']);
        
         let Resultarray = [];
        for(let i = 0; i < results.length; i++){
            Resultarray.push({
                "_id" :  results[i]._id,
                "customer_id": results[i].customer_id.id,
                "customer_transaction_id":results[i].transaction_id,
                "customer_name": results[i].customer_id.name,
                "customer_Phone":results[i].customer_id.phone,
                "customer_email":results[i].customer_id.email,
                "customer_address":results[i].customer_id.address,
                "Scheme_id": results[i].scheme_id.id,
                "Scheme_name": results[i].scheme_id.scheme_name,
                "Scheme_code":results[i].scheme_id.scheme_code,
                "Scheme_duration":results[i].scheme_id.duration,
                "Installment":results[i].scheme_id.installment,
                "Scheme_Amount":results[i].scheme_id.amount,
                // "customer_scheme_installment":results[i].scheme_id.installment,
                // "customer_scheme_amount":results[i].scheme_id.amount,
            })
        }
        res.status(200).send({ status: "true",message: 'Scheme List Loading Success', data:Resultarray})
        // res.status(200).send({ status: "true",message: 'Scheme List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});


/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
   SchemeList .find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Scheme List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate(['customer_id', 'scheme_id']);

});



router.get("/scheme/:id",async (req, res) => {
    // console.log(req.params.id)
    SchemeList.find({customer_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Scheme List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate('scheme_id');

});
module.exports = router