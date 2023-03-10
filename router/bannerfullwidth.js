const express     = require('express');

const router     =  new express.Router()
const authenticate = require('../middleware/auth');
const BannerFullWidth = require('../model/bannerfullwidth');




/////////////////// CREATE Banner FullWidth DATA ////////////////////////////


router.post("/add", async (req, res) => {
  const {content,title,subtitle,image}=req.body;
//   console.log(req.body)
  try {
   
    const bannerdata = new BannerFullWidth({
      content,title,subtitle,image
     });
    await bannerdata.save();
    res.status(200).send({ status: "true",message: 'Banner List Loading Success', data:bannerdata})
  } catch (error) {
    res.status(200).send({ status: "false",message: 'Error in Solving'})
  }
});

       
        
          
//////////////////////  UPDATE Slider DATA /////////////////////

router.put('/:id',async (req,res) => {
    BannerFullWidth.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Banner Updated Success',data:banner})
     });
 });  
      
   

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id' ,async (req, res) => {
    BannerFullWidth.findByIdAndUpdate(req.params.id, {status:0}, (err, Slider) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Banner Deleted Success',data:banner})
    });
})

/////////////////////// GET Slider DATA //////////////////////

router.get("/getbannerlist",async (req, res) => {
    try {
 
        const results = await BannerFullWidth.find({});
        const count = await BannerFullWidth.countDocuments();
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

router.get("/:id",async (req, res) => {
    BannerFullWidth.find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Banner List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    });

});

module.exports = router;