const express     = require('express');
const router      =  new express.Router()
const Category        = require('../model/branch')
const authenticate = require('../middleware/auth')

router.post('/',authenticate, async (req,res) => {
    
    const { name,location,remark,count } = req.body
    try {
        const Checkuser = await Category.findOne({name});
        if (Checkuser) { return res.status(200).json({ status: false,message: 'Shop Already Exists' }) }
        category = new Category({
            name,location,remark,count
         })
        await category.save()
        res.status(200).send({ status: "true",message: 'Shop Saved',data:category})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',authenticate, async (req,res) => {
     Category.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Shop Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',authenticate, async (req, res) => {
    Category.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Shop Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/",async (req, res) => {
        try {
            // execute query with page and limit values
            const results = await Category.find({}).exec();
            // get total documents in the Posts collection 
            const count = await Category.countDocuments();
            const datalist = {
                totalHits: count,
                results
           }
            res.status(200).send({ status: "true",message: 'Shop List Loading Success', data:datalist})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id", authenticate,async (req, res) => {
    Category.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Shop List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router