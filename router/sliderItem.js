const express     = require('express');

const sliderRouter     =  new express.Router()
const authenticate = require('../middleware/auth');
const SliderList = require('../model/slider');


/////////////////// CREATE Slider DATA ////////////////////////////


sliderRouter.post("/create", async (req, res) => {
  const {content,title,subtitle,image}=req.body;
//   console.log(req.body)
  try {
   
    const sliderdata = new SliderList({
      content,title,subtitle,image
     });
    await sliderdata.save();
    res.status(200).send({ status: "true",message: 'Slider List Loading Success', data:sliderdata})
  } catch (error) {
    res.status(200).send({ status: "false",message: 'Error in Solving'})
  }
});

       
        
          
//////////////////////  UPDATE Slider DATA /////////////////////

sliderRouter.put('/:id',async (req,res) => {
    SliderList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Slider Updated Success',data:slider})
     });
 });  
      
   

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
sliderRouter.delete('/:id' ,async (req, res) => {
    SliderList.findByIdAndUpdate(req.params.id, {status:0}, (err, Slider) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Slider Deleted Success',data:slider})
    });
})

/////////////////////// GET Slider DATA //////////////////////

sliderRouter.get("/getslider",async (req, res) => {
    try {
 
        const results = await SliderList.find({});
        const count = await SliderList.countDocuments();
        const sliderdata1 = {
            totalHits: count,
            results
       }
       res.status(200).send({ status: "true",message: 'Slider List Loading Success', data:sliderdata1})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
    
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

sliderRouter.get("/:id",async (req, res) => {
    SliderList.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Slider List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = sliderRouter;