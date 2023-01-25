const express     = require('express');
const UserScheme = require('../model/userscheme');
const router      =  new express.Router();


/////////////////// CREATE USER SCHEME /////////////////////////////////////
router.post('/create-userscheme',async(req,res)=>{
    const {user_id,scheme_id} = req.body
    try {
        schemelist = new UserScheme({
           user_id,scheme_id
         })
        await schemelist.save()
        res.status(200).send({ status: "true",message: 'Scheme Saved',data:schemelist})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});

/////////////////////// GET USER SCHEME DATA //////////////////////

router.get("/getuserscheme",async (req, res) => {
    try {
      
        const results = await UserScheme.find({}).populate(['user_id', 'scheme_id']);

        // return res.send(results)
        let Resultarray = [];
        
        for(let i = 0; i < results.length; i++){
            Resultarray.push({
                "user_id": results[i].id,
                "user_name": results[i].user_id.name,
                "user_Phone":results[i].user_id.phone,
                "user_address":results[i].user_id.addresstype,
                "user_scheme_product": results[i].scheme_id.product,
                "user_scheme_name":results[i].scheme_id.scheme_name,
                "user_scheme_code":results[i].scheme_id.scheme_code,
                "user_scheme_duration":results[i].scheme_id.duration,
                "user_scheme_installment":results[i].scheme_id.installment,
                "user_scheme_amount":results[i].scheme_id.amount,
            })
        }

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
    });

});



module.exports = router
