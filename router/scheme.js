const express     = require('express');
const Schemes = require('../model/scheme');

const router      =  new express.Router();

//////////////////////// CREATE SCHEME  ////////////////////
router.post('/createscheme',async(req,res)=>{
    const {scheme_code,scheme_name,scheme_desc,duration,installment, totalinstallment,paidinstallment,pendinginstallment,amount,min_amount,max_amount,rate,grams,amountstepup,product_status,status} = req.body
    try {
       const schemelist = new Schemes({
           scheme_code,scheme_name,scheme_desc,duration,installment, totalinstallment,paidinstallment,pendinginstallment,amount,min_amount,max_amount,rate,grams,amountstepup,product_status,status
         })
        await schemelist.save()
        res.status(200).send({ status: "true",message: 'Scheme Saved',data:schemelist})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});
/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     Schemes.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Category Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',async (req, res) => {
    Schemes.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Category Deleted Success',data:user})
    });
})

/////////////////////// GET SCHEME DATA //////////////////////

router.get("/getscheme",async (req, res) => {
    try {
      
        const results = await Schemes.find({});
        res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
    
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

router.get("/:id",async (req, res) => {
    Schemes.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});



module.exports = router