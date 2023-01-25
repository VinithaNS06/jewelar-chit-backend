const express     = require('express');
const router      =  new express.Router()
const Product        = require('../model/products')
const authenticate = require('../middleware/auth')

router.post('/',async (req,res) => {
    
    const { skuid,category_id,title,product,remark,carrot,wastage,making,image,price } = req.body
    try {
        const Checkproduct = await Product.findOne({skuid,category_id,title,product});
        if (Checkproduct) { return res.status(200).json({ status: false,message: 'Product Already Exists' }) }
       const category = new Product({
            skuid,category_id,title,product,remark,carrot,wastage,making,image ,price
         })
        await category.save()
        res.status(200).send({ status: "true",message: 'Product Saved',data:category})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',authenticate, async (req,res) => {
     Product.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Product Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',authenticate, async (req, res) => {
    Product.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Product Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/getproduct",async (req, res) => {
        try {
            // execute query with page and limit values
            const results = await Product.find({}).populate('category_id').exec();
            // get total documents in the Posts collection 
            const count = await Product.countDocuments();
            const datalist = {
                totalHits: count,
                results
           }
            res.status(200).send({ status: "true",message: 'Product List Loading Success', data:datalist})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
    Product.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Product List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});
/* ////////////////////////////////////////  GET BY PRODUCT ID  ////////////////////////////////// ///*/
router.get("/byprduct/:id",async (req, res) => {
    Product.find({category_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Product List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router
