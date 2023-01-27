const express     = require('express');
const Staff = require('../model/staff');
const router     =  new express.Router()
// const authenticate = require('../middleware/auth')

/////////////////// CREATE STAFF DATA ////////////////////////////

router.post('/create', async (req,res) => {
    
    const { name,staffid,comments} = req.body;
 
    try {
        const CheckStaffs = await Staff.findOne({name,comments});
        const CheckStaff=await Staff.findOne({staffid})
        if (CheckStaffs) { return res.status(200).json({ status: false,message: 'Staff Already Exists' }) }
        if (CheckStaff) { return res.status(200).json({ status: false,message: 'Staff Already Exists' }) }
        staffdata= new Staff({
            name,
            staffid,
            comments,
        })      
        await staffdata.save()
        res.status(200).send({ status: "true",message: 'Staff Saved',data:staffdata})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});
       
        
          
//////////////////////  UPDATE STAFF DATA /////////////////////

router.put('/:id',async (req,res) => {
    Staff.findByIdAndUpdate(req.params.id, req.body, (err, staff) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Staff Updated Success',data:staff})
     });
 });  
      
   

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id' ,async (req, res) => {
    Staff.findByIdAndRemove(req.params.id, req.body, (err, staff) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Staff Deleted Success',data:staff})
    });
})

/////////////////////// GET STAFF DATA //////////////////////

router.get("/getstaff",async (req, res) => {
    try {
      
        const results = await Staff.find({}).exec();
        const count = await Staff.countDocuments();
        const stafflist = {
            totalHits: count,
            results
       }
       res.status(200).send({ status: "true",message: 'Staff List Loading Success', data:stafflist})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
    
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

router.get("/:id",async (req, res) => {
    Staff.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Staff List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router;