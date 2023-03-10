const express     = require('express');

const bannerRouter     =  new express.Router()
const authenticate = require('../middleware/auth');
const BannerList = require('../model/banner');



/////////////////// CREATE Slider DATA ////////////////////////////


bannerRouter.post("/add", async (req, res) => {
  const {content,title,subtitle,image}=req.body;
//   console.log(req.body)
  try {
   
    const bannerdata = new BannerList({
      content,title,subtitle,image
     });
    await bannerdata.save();
    res.status(200).send({ status: "true",message: 'Banner List Loading Success', data:bannerdata})
  } catch (error) {
    res.status(200).send({ status: "false",message: 'Error in Solving'})
  }
});

       
        
          
//////////////////////  UPDATE Slider DATA /////////////////////

bannerRouter.put('/:id',async (req,res) => {
    BannerList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Banner Updated Success',data:banner})
     });
 });  
      
   

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
bannerRouter.delete('/:id' ,async (req, res) => {
    BannerList.findByIdAndUpdate(req.params.id, {status:0}, (err, Slider) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Banner Deleted Success',data:banner})
    });
})

/////////////////////// GET Slider DATA //////////////////////

bannerRouter.get("/getbanner",async (req, res) => {
    try {
 
        const results = await BannerList.find({});
        const count = await BannerList.countDocuments();
        const bannerdata1 = {
            totalHits: count,
            results
       }
       res.status(200).send({ status: "true",message: 'Banner List Loading Success', data:bannerdata1})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});
    
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

bannerRouter.get("/:id",async (req, res) => {
    BannerList.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Banner List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = bannerRouter;