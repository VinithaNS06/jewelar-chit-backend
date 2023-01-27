const express     = require('express');
const Delivery = require('../model/delivery');
const router      =  new express.Router();

router.post('/createdelivery',async (req,res) => {
    
    const { user_id,product_id,total_amount,delivery_fee,final_amount,transaction_id} = req.body
    try {
        const Checkdelivery = await Delivery.findOne({user_id,product_id,total_amount,delivery_fee,final_amount,transaction_id});
        if (Checkdelivery ) { return res.status(200).json({ status: false,message: 'Delivery Already Exists' }) }
       const delivery = new Delivery({
            user_id,product_id,total_amount,delivery_fee,final_amount,transaction_id
         })
        await delivery.save()
        res.status(200).send({ status: "true",message: 'Delivery Saved',data:delivery})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});


/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     Delivery.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Delivery Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id', async (req, res) => {
    Delivery.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Delivery Deleted Success',data:user})
    });
})


/////////////////////// GET DELIVERY  DATA //////////////////////

router.get("/",async (req, res) => {
    try {
      
        const results = await Delivery.find({}).populate(['user_id', 'product_id']);

        // return res.send(results)
        let Resultarray = [];
        
        for(let i = 0; i < results.length; i++){
            Resultarray.push({
                "user_id": results[i].id,
                "user_name": results[i].user_id.name,
                "user_Phone":results[i].user_id.phone,
                "delivery_product": results[i].product_id.product,
                "delivery_product_title":results[i].product_id.title,
                "delivery_product_image":results[i].product_id.image,
             });
        };

       res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:Resultarray})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
    Delivery.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Delivery  List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router
