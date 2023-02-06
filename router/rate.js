const express     = require('express');
const router      =  new express.Router()
const Rate        = require('../model/rate')
const authenticate = require('../middleware/auth')

const RateHistory = require('../model/ratehistory');

router.post('/', async (req,res) => {
    const { rate,type } = req.body;
   
    try {
        let Products_count = await Rate.countDocuments();
        rowid =  Products_count+1        
        ratelist = new Rate({
            rowid,
            rate,
            type
         })
        await ratelist.save()
        res.status(200).send({ status: "true",message: 'Product Saved',data:ratelist})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id', async (req,res) => {
    Rate.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        }
        res.status(200).send({ status: "true",message: 'Rate Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',authenticate, async (req, res) => {
    Rate.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Rate Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/getrate",async (req, res) => {
        //user_id = req.user.id;
        try {
            // execute query with page and limit values
            const results = await Rate.find({}).exec();
            const datalist = {
                totalHits: results.length,
                results
           }
            res.status(200).send({ status: "true",message: 'Rate List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

/////////////////////// GET DATA BY ID ///////////////////////////////
router.get("/:id",async (req, res) => {

    const results = await Rate.find({_id: req.params.id})

            makeArr = []

            for(let i = 0; i < results.length; i++) {
                currentRateDetails = await currentRate.find({rate_id: results[i]._id})

                if(currentRateDetails != "") {
                    makeArr.push({
                     rate_id: results[i]._id,   
                    current_rate_id: currentRateDetails[i]._id,
                    type: results[i].type,
                    default_rate: results[i].rate,
                    status: results[i].status,
                    current_rate: currentRateDetails[0].rate
                })
                }else{
                    makeArr.push({
                    rate_id: results[i]._id,  
                    type: results[i].type,
                    default_rate: results[i].rate,
                    status: results[i].status
                })  
                }

            }

            // return res.status(200).json({status: 'true', message: 'fetched suc', data: makeArr})

            return res.send(makeArr[0])

});


module.exports = router