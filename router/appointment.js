const express     = require('express');
const router      =  new express.Router();
const authenticate = require('../middleware/auth')
const Appointment=require("../model/appointment")
// const Store=require("../model/store")
const moment = require('moment');

////////////////// Create Appoinment ////////////////

router.post('/createappt', async (req,res) => {
    const user_id=req.body.user_id;
    const staff_id=req.body.staff_id;
    const product_id=req.body.product_id;   
    const { Products,appointment_mode,date,time} = req.body;
 
    try {
        const CheckAppointment = await Appointment.findOne({user_id,Products,appointment_mode,date,time});
        
        if (CheckAppointment) { return res.status(200).json({ status: false,message: 'Appointment Already Exists' }) }
        apptdata= new Appointment({
            user_id,staff_id,product_id,appointment_mode,
            Products,date,time
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
      
        const results = await Appointment.find({}).populate(['user_id', 'staff_id','product_id']);

        return res.send(results)
        let Resultarray = [];
        
        for(let i = 0; i < results.length; i++){
            Resultarray.push({
                 "_id" :  results[i]._id,
                "user_id": results[i].id,
                "user_name": results[i].user_id.name,
                "user_Phone":results[i].user_id.phone,
                "user_email":results[i].user_id.email,
                "user_Products": results[i].Products,
                "user_proid":results[i]._id,
                "user_pro":results[i].product_id.skuid,
                "user_pro_title":results[i].product_id.title,
                "user_pro_product":results[i].product_id.product,
                "user_pro_price":results[i].product_id.price,
                "user_pro_carrot":results[i].product_id.carrot,
                "user_pro_image":results[i].product_id.image,
                "user_date": results[i].date,
                "user_Time": results[i].time,
                // "user_staff_name":results[i].scheme_id.staff_name,
                
                // "user_scheme_duration":results[i].scheme_id.duration,
                // "user_scheme_installment":results[i].scheme_id.installment,
                // "user_scheme_amount":results[i].scheme_id.amount,
            })
        }
// res.status(200).send({ status: "true",message: 'Appointment List Loading Success', data:results})
       res.status(200).send({ status: "true",message: 'Appointment List Loading Success', data:Resultarray})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
})
     

//////////////////////////// GET APPOINTMENT BY ID /////////////
router.get("/appt/:id",async (req, res) => {
    user_id = req.body.user_id;
    try {
        const results = await Appointment.find({}).populate(['user_id','product_id']);
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


router.get("/apptdetails/:id",async (req, res) => {
    // console.log(req.params.id)
    Appointment.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Order List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate('product_id');

});
module.exports = router