const express     = require('express');
const Transaction = require('../model/transaction');
const router      =  new express.Router();
const ObjectId = require('mongodb').ObjectID;

router.post('/createtransaction',async (req,res) => {
    const user_id = req.body.user_id;
    const transaction_id=req.body.transaction_id;
    const {  scheme,amount,grams,date_on,status } = req.body
   try {
        const Checktransaction= await Transaction.findOne({user_id,transaction_id,scheme});
        if (Checktransaction) { return res.status(200).json({ status: false,message: 'Transaction Already Exists' }) }
        CountDoc = await Transaction.find({})
    //  const  transaction_id = CountDoc.length+1
      const cards = new Transaction({
          user_id, scheme,transaction_id,amount,grams,date_on,status
         })
        await cards.save()
        res.status(200).send({ status: "true",message: 'Transaction Saved',data:cards})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Transaction Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id', async (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, {status:0}, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Transaction Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/",async (req, res) => {
        user_id = req.user.id
        try {
            // execute query with page and limit values
            const results = await Transaction.find({status:1}).exec();
            // get total documents in the Posts collection 
            const count = await Transaction.countDocuments();
            const datalist = {
                totalHits: results.length,
                results
           }
            res.status(200).send({ status: "true",message: 'Transaction List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
    Transaction.find({"_id":ObjectId(req.params.id)}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Transaction List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router