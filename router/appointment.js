const express     = require('express');
const router      =  new express.Router();
const authenticate = require('../middleware/auth')
const Appointment=require("../model/appointment")
const Store=require("../model/store")
const moment = require('moment');

////////////////// Create Appoinment ////////////////

router.post('/createappt', async (req,res) => {
    const user_id=req.body.user_id;
    const staff_id=req.body.staff_id;   
    const { products,date,time} = req.body;
 
    try {
        const CheckAppointment = await Appointment.findOne({user_id,products,date,time});
        
        if (CheckAppointment) { return res.status(200).json({ status: false,message: 'Appointment Already Exists' }) }
        apptdata= new Appointment({
            user_id,staff_id,
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
    try {
      
        const results = await Appointment.find({}).populate(['user_id', 'staff_id']);

        // return res.send(results)
        let Resultarray = [];
        
        for(let i = 0; i < results.length; i++){
            Resultarray.push({
                "user_id": results[i].id,
                "user_name": results[i].user_id.name,
                "user_Phone":results[i].user_id.phone,
                "user_email":results[i].user_id.email,
                "user_products": results[i].products,
                "user_date": results[i].date,
                "user_Time": results[i].time,
                // "user_staff_name":results[i].scheme_id.staff_name,
                
                // "user_scheme_duration":results[i].scheme_id.duration,
                // "user_scheme_installment":results[i].scheme_id.installment,
                // "user_scheme_amount":results[i].scheme_id.amount,
            })
        }

       res.status(200).send({ status: "true",message: 'Appointment List Loading Success', data:Resultarray})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
})
     

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