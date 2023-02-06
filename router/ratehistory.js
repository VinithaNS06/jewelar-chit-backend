const express     = require('express');
const Rate1 = require('../model/rate');
const RateHistory = require('../model/ratehistory');


const router      =  new express.Router();


router.post('/',async (req,res) => {
    
    const {rate_id,rate,date_on} = req.body;
   
    try {
       
            Rate1.updateOne( { _id: `${rate_id}`},
            {
                $set: {
                    rate: rate
                }
            }, function(err, res) {
                if (err) throw err;
            })
                const ratelist = new RateHistory({
                        rate_id,rate,date_on
                })
                ratelist.save();

        res.status(200).send({ status: "true",message: 'RateHistory Saved',data:ratelist})
    } catch (err) {
        // console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/////////////////////////// UPDATE CURRENT RATE //////////////////////////
// router.put("/update",async (req,res)=>{
//    Rate.findByIdAndUpdate(req.rate_id, req.body, (err, rate) => {
//         if (err) {
//             return res.status(200).send({status: "false",message: "Error",errors: err  })
//         }
//         res.status(200).send({ status: "true",message: 'Rate Updated Success',data:rate})
//     });
// })





module.exports = router;