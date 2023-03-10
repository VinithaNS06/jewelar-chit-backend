const express     = require('express');
const router      =  new express.Router();
const authenticate = require('../middleware/auth');
const Order = require('../model/orders');

router.post('/',async (req,res) => {
    
    const { customer_id ,product_id,total_amount,transaction_id,date_on,status} = req.body;
   
    try {
        const Checkcustomer = await Order.findOne({customer_id,product_id,transaction_id,total_amount});
        if (Checkcustomer) { return res.status(200).json({ status: false,message: 'Order Already Exists' }) }
      const category = new Order({
                customer_id,product_id,total_amount,transaction_id,date_on,status,
         })
        await category.save()
        res.status(200).send({ status: "true",message: 'Order Saved',data:category})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
   
     Order.findByIdAndUpdate(req.params.id, req.body, (err, customer) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Order Updated Success',data:customer})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',async (req, res) => {
    Order.findByIdAndUpdate(req.params.id, {status:0}, (err, customer) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Order Deleted Success',data:customer})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/",async (req, res) => {
        try {
            // execute query with page and limit values
            const results = await Order.find({status:1}).populate(['customer_id', 'product_id']);
            // get total documents in the Posts collection 
        //    return res.send(results)
            let Resultarray = [];
      
        for(let i = 0; i < results.length; i++){
            Resultarray.push({
                "_id" :  results[i]._id,
                "customer_id": results[i].customer_id._id,
                "customer_transaction_id":results[i].transaction_id,
                "customer_name": results[i].customer_id.name,
                "customer_Phone":results[i].customer_id.phone,
                "customer_email":results[i].customer_id.email,
                "customer_address":results[i].customer_id.address,
                "product_id": results[i].product_id.id,
                "customer_product_product": results[i].product_id.product,
                "customer_product_title":results[i].product_id.title,
                "customer_product_price":results[i].product_id.price,
                 "customer_product_image":results[i].product_id.image,
                  
            })
        //    Resultarray({
        //     "product_count": results[0].length
        //    })
        }

        // res.status(200).send({ status: "true",message: 'Order List Loading Success', data:results})
            res.status(200).send({ status: "true",message: 'Order List Loading Success', data:Resultarray})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
    Order.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Order List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate(['customer_id', 'product_id']);

});



router.get("/customerorders/:id",async (req, res) => {
    // console.log(req.params.id)
    Order.find({customer_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Order List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate('product_id');

});




router.get("/orderlist/totalorder",async(req,res)=>{
    //  try {
            // execute query with page and limit values
            const customersData = await Order.find({});
            // return res.json({result});
             let makearray = []; 

            for(let i = 0; i < customersData.length; i++){
                const customerOrders = await Order.find({customer_id: customersData[i].customer_id}).populate(['customer_id', 'product_id']);
               makearray.push({
                    "_id" :  customerOrders[0]._id,
                    "customer_id": customerOrders[0].customer_id._id,
                    "customer_name":customerOrders[0].customer_id.name,
                    "product_count":customerOrders.length
                    }) 
            }
           
           res.status(200).send({ status: "true",message: 'Order List Loading Success', results:makearray})
        // } catch (err) {
        //     res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        // }
})
module.exports = router