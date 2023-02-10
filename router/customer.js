const express     = require('express');
const Customer = require('../model/cutomer');
const router     =  new express.Router()
// const authenticate = require('../middleware/auth')

/////////////////// CREATE Customer DATA ////////////////////////////

router.post('/create', async (req,res) => {
    
    const { name,email,phone,address} = req.body;
    
 
    try {
        const CheckCustomer = await Customer.findOne({ name,email,phone,address});
        if (CheckCustomer) { return res.status(200).json({ status: false,message: 'Customer Already Exists' }) }
       
       const customerdata= new Customer({
            name,email,phone,address
        })      
        await  customerdata.save()
        res.status(200).send({ status: "true",message: 'Customer Saved',data:customerdata})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});
       
        
          
//////////////////////  UPDATE Customer DATA /////////////////////

router.put('/:id',async (req,res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, (err, customer) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Customer Updated Success',data:customer})
     });
 });  
      
   

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id' ,async (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, {status:0}, (err, customer) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Customer Deleted Success',data:customer})
    });
})

/////////////////////// GET Customer DATA //////////////////////

router.get("/getCustomer",async (req, res) => {
    try {
      
        const results = await Customer.find({status:1});
        const count = await Customer.countDocuments();
        const customerlist = {
            totalHits: count,
            results
       }
       res.status(200).send({ status: "true",message: 'Customer List Loading Success', data:customerlist})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
    
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

router.get("/:id",async (req, res) => {
    Customer.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Customer List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});
});





module.exports = router;