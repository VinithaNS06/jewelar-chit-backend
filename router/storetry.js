const express     = require('express');
const router      =  new express.Router()
const authenticate = require('../middleware/auth');
const Store = require('../model/store');


router.post('/', async (req,res) => {
    user_id = req.body.user_id;

    const { product_id,qty } = req.body
    try {
        const Checkuser = await Store.findOne({user_id,product_id});
        if (Checkuser) { return res.status(200).json({ status: false,message: ' Already Exists' }) }
      const storelist = new Store({
            user_id,
            product_id,
            qty
         })
        await storelist.save()
        res.status(200).send({ status: "true",message: 'Try List Saved',data:storelist})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id', async (req,res) => {
    Store.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Try List Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id', async (req, res) => {
    Store.findByIdAndUpdate(req.params.id, {status:0},(err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Try List Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/",async (req, res) => {
        user_id = req.body.user_id;
        try {
            // execute query with page and limit values
            const results = await Store.find({status:1}).populate(['user_id','product_id']);
            // get total documents in the Posts collection 
            const count = await Store.countDocuments();
            const datalist = {
                totalHits: count,
                results
           }
            res.status(200).send({ status: "true",message: 'Try List List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});



module.exports = router