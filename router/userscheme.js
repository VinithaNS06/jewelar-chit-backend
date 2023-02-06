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
/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     UserScheme.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Category Updated Success',data:user})
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
      
        const results = await UserScheme.find({status:1}).populate(['user_id', 'scheme_id']);

        // return res.send(results)
        // let Resultarray = [];
        
        // for(let i = 0; i < results.length; i++){
        //     Resultarray.push({
        //         "_id" :  results[i]._id,
        //         "user_id": results[i].id,
        //         "user_name": results[i].user_id.name,
        //         "user_Phone":results[i].user_id.phone,
        //         "user_address":results[i].user_id.addresstype,
        //          "scheme_id" :  results[i]._id,
        //         "user_scheme_product": results[i].scheme_id.product,
        //         "user_scheme_name":results[i].scheme_id.scheme_name,
        //         "user_scheme_code":results[i].scheme_id.scheme_code,
        //         "user_scheme_duration":results[i].scheme_id.duration,
        //         "user_scheme_installment":results[i].scheme_id.installment,
        //         "user_scheme_amount":results[i].scheme_id.amount,
        //     })
        // }

        res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:results})

    //    res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:Resultarray})
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


router.get("/users/:schemeid",async (req, res) => {
    UserScheme.find({scheme_id:req.params.schemeid}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Scheme List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router
