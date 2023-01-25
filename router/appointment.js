const express     = require('express');
const router      =  new express.Router();
const authenticate = require('../middleware/auth')
const Appointment=require("../model/appointment")
const Store=require("../model/store")
const moment = require('moment');

////////////////// Create Appoinment ////////////////

router.post('/createappt', async (req,res) => {
    const user_id=req.body.user_id;   
    const { products,date,time} = req.body;
 
    try {
        const CheckAppointment = await Appointment.findOne({user_id,products,date,time});
        
        if (CheckAppointment) { return res.status(200).json({ status: false,message: 'Appointment Already Exists' }) }
        apptdata= new Appointment({
            user_id,
            products,date,time
        })      
        await apptdata.save()
        res.status(200).send({ status: "true",message: 'Appointment Saved',data:apptdata})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});



////////////////// GET APPOINTMENT DATA /////////////////////
router.get("/getappt",async (req, res) => {
     const user_id = req.body.user_id;
        try {
            // execute query with page and limit values
            const results = await Appointment.find({});
            // get total documents in the Posts collection 
            const count = await Appointment.countDocuments();
            const datalist = {
                totalHits: count,
                results
           }
            res.status(200).send({ status: "true",message: 'Schedule List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});


//////////////////////////// GET APPOINTMENT BY ID /////////////
router.get("/appt/:id",async (req, res) => {
    user_id = req.body.user_id;
    try {
        const results = await Appointment.find({}).populate('user_id');
        res.status(200).send({ status: "true",message: 'Schedule List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});


/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     Appointment.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Appointment Updated Success',data:user})
    });
})






/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',async (req, res) => {
    Appointment.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Schedule Deleted Success',data:user})
    });
})
module.exports = router