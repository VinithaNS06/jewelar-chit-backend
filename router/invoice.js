const express     = require('express');
const invoice = require('../model/invoice');
const Invoice = require('../model/invoice');
const router      =  new express.Router();

router.post('/createinvoice',async (req,res) => {
    
   
    const { invoiceNo,branch_id,customer_id,scheme_id} = req.body
    try {
        const Checkinvoice = await Invoice.findOne({invoiceNo,branch_id,customer_id,scheme_id});
        if (Checkinvoice ) { return res.status(200).json({ status: false,message: 'invoice Already Exists' }) }
       const invoice = new Invoice({
            invoiceNo,branch_id,customer_id,scheme_id
         })
        await invoice.save()
        res.status(200).send({ status: "true",message: 'Invoice Saved',data:invoice})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});


/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     Invoice.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Invoice Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id', async (req, res) => {
    Invoice.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Invoice Deleted Success',data:user})
    });
})


/////////////////////// GET invoice  DATA //////////////////////

router.get("/getinvoice",async (req, res) => {
    try {
      
        const results = await Invoice.find({}).populate(['branch_id','scheme_id','customer_id']);

        return res.send(results)
        let Resultarray = [];
        
        for(let i = 0; i < results.length; i++){
            Resultarray.push({
                "user_id": results[i].id,
                "user_name": results[i].user_id.name,
                "user_Phone":results[i].user_id.phone,
                "invoice_product": results[i].product_id.product,
                "invoice_product_title":results[i].product_id.title,
                "invoice_product_image":results[i].product_id.image,
             });
        };

       res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:Resultarray})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
    Invoice.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Invoice  List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router
