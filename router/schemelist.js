const express     = require('express');
const router      =  new express.Router();
const authenticate = require('../middleware/auth');

const SchemeList = require('../model/schemeslist');

router.post('/schemelist',async (req,res) => {
    
    const { user_id ,scheme_id,date_on,status} = req.body;
   
    try {
        const Checkuser = await SchemeList.findOne({user_id,scheme_id});
        if (Checkuser) { return res.status(200).json({ status: false,message: 'Schemelist Already Exists' }) }
      const category = new SchemeList({
                user_id,scheme_id,date_on,status,
         })
        await category.save()
        res.status(200).send({ status: "true",message: 'SchemeList Saved',data:category})
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});
/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/:id',async (req,res) => {
     SchemeList.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Category Updated Success',data:user})
    });
})

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id',async (req, res) => {
    SchemeList.findByIdAndUpdate(req.params.id, {status:0}, (err, user)=> {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'Category Deleted Success',data:user})
    });
})

/////////////////////// GET SCHEME DATA //////////////////////

router.get("/getschemelist",async (req, res) => {
    try {
      
        const results = await SchemeList.find().populate(['user_id','scheme_id']);
        res.status(200).send({ status: "true",message: 'UserScheme List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});


/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id",async (req, res) => {
   SchemeList .find({_id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Scheme List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate(['user_id', 'scheme_id']);

});



router.get("/scheme/:userid",async (req, res) => {
    SchemeList.find({id:req.params.id}
        ,(err, docs) => {
        if (!err) {
            res.status(200).send({ status: "true",message: 'Scheme List Loading Success', data:docs})
        } else {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
    }).populate('scheme_id');

});
module.exports = router