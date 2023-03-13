const express = require("express");
const UserScheme = require("../model/userscheme");
const router = new express.Router();
const authenticate = require("../middleware/auth");
const Rate = require("../model/rate");
// const SchemeList = require('../model/schemeslist');
var ObjectId = require("mongodb").ObjectId;

router.post("/", authenticate, async (req, res) => {
  // user_id = req.user.id;
  const { user_id, scheme, transation_id, amount, payment_status } = req.body;
  try {
    pay = new UserScheme({
      user_id,
      scheme,
      transation_id,
      amount,
      payment_status,
      is_paid: 1,
    });
    await pay.save();
    res.status(200).send({
      status: "true",
      message: "UserScheme Updated Success",
      data: pay,
    });
    // });
    /* /////////////////////////////////////////////////////////////////////////  */
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", authenticate, async (req, res) => {
  UserScheme.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "UserScheme Updated Success",
      data: user,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", authenticate, async (req, res) => {
  UserScheme.findByIdAndRemove(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "UserScheme Deleted Success",
      data: user,
    });
  });
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/", authenticate, async (req, res) => {
  user_id = req.user.id;
  try {
    // execute query with page and limit values
    const results = await UserScheme.find({
      user_id: req.user.id,
      is_paid: "Paid",
    }).exec();
    const datalist = {
      totalHits: results.length,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "UserScheme List Loading Success",
      data: results,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  productid = req.params.id;
  try {
    // execute query with page and limit values
    const results = await UserScheme.find({ _id: productid }).exec();
    const datalist = {
      totalHits: results.length,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "UserScheme List Loading Success",
      data: results,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});
router.get("/scheme/:id", authenticate, async (req, res) => {
  scheme = req.params.id;
  try {
    // execute query with page and limit values
    const results = await UserScheme.find({
      user_id: req.user.id,
      scheme: scheme,
    }).exec();
    const datalist = {
      totalHits: results.length,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "UserScheme List Loading Success",
      data: results,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});
module.exports = router;
