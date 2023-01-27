const express     = require('express');
const router      =  new express.Router()
const Branch        = require('../model/branch')

router.get("/storelist",async (req, res) => {
    try {
        // execute query with page and limit values
        const results = await Branch.find({}).exec();
        res.status(200).send({ status: "true",message: 'Store List Loading Success', data:results})
    } catch (err) {
        res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
    }
});

module.exports = router