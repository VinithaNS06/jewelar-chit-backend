const express     = require('express');
const router      =  new express.Router()

const authenticate = require('../middleware/auth');
const Notification = require('../model/notification');


router.post('/createnotify',async (req,res) => {
    
    const {notifyname,description} = req.body;
     try {
       const settinglist = new Notification({
           notifyname,description
         })
        await settinglist.save()
        res.status(200).send({ status: "true",message: 'Setting Saved',data:settinglist})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})


/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     Notification.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Setting Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',async (req, res) => {
    Notification.findByIdAndUpdate(req.params.id, {status:0}, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Setting Deleted Success',data:user})
    });
})

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/getnotify",async (req, res) => {
        try {
            // execute query with page and limit values
            const results = await Notification.find({status:1});
            
            // get total documents in the Posts collection 
            const count = await Notification.countDocuments();
            const datalist = {
                totalHits: count,
                results
           }
            res.status(200).send({ status: "true",message: 'Setting List Loading Success', data:datalist})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
    Notification.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Setting List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router