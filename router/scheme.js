const express = require("express");
const Schemes = require("../model/scheme");
const SchemeList = require("../model/schemeslist");
const authenticate = require("../middleware/auth");
const Payment = require("../model/payments");
const { ObjectID, ObjectId } = require("mongodb");
const moment = require("moment");
const UserScheme = require("../model/userscheme");

const router = new express.Router();

//////////////////////// CREATE SCHEME  ////////////////////
router.post("/createscheme", authenticate, async (req, res) => {
  //  user_id = req.user.id;
  const {
    scheme_code,
    scheme_name,
    scheme_desc,
    Benefits,
    duration,
    installment,
    totalinstallment,
    paidinstallment,
    pendinginstallment,
    amount,
    min_amount,
    max_amount,
    rate,
    grams,
    amountstepup,
    product_status,
    status,
  } = req.body;
  try {
    let Scheme_count = await Schemes.countDocuments();

    scheme = Scheme_count + 1;

    const Checkuser = await Schemes.findOne({
      scheme_name,
      duration,
      installment,
    });
    if (Checkuser) {
      return res
        .status(200)
        .json({ status: false, message: "Scheme Already Exists" });
    }

    const schemelist = new Schemes({
      scheme_code,
      scheme_name,
      scheme_desc,
      Benefits,
      duration,
      installment,
      totalinstallment,
      paidinstallment,
      pendinginstallment,
      amount,
      min_amount,
      max_amount,
      rate,
      grams,
      amountstepup,
      product_status,
      status,
    });
    // console.log(schemelist);
    await schemelist.save();

    res
      .status(200)
      .send({ status: "true", message: "Scheme Saved", data: schemelist });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});
/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", async (req, res) => {
  Schemes.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Category Updated Success",
      data: user,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", async (req, res) => {
  Schemes.findByIdAndUpdate(req.params.id, { status: 0 }, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Category Deleted Success",
      data: user,
    });
  });
});

/////////////////////// GET SCHEME DATA //////////////////////

router.get("/getscheme", authenticate, async (req, res) => {
  try {
    // execute query with page and limit values
    const results = await Schemes.find({}).exec();
    const datalist = {
      totalHits: results.length,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "Scheme List Loading Success",
      data: results,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

router.get("/:id", authenticate, async (req, res) => {
  check = await UserScheme.find({
    user_id: ObjectId(req.user.id),
    scheme: ObjectId(req.params.id),
  });

  Schemes.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      //   console.log(user_id)
      // check = await SchemeList.find({user_id:ObjectId(req.user.id),scheme:ObjectId(req.params.id)})
      // datas.push({'Schme':vall,Isexist:check.length})
      // console.log(check);
      // console.log(check[0].is_paid);
      // console.log('sdsfas')
      res.status(200).send({
        status: "true",
        message: "Scheme List Loading Success",
        data: docs,
        Ispay: check[0].is_paid,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

router.get("/user/paymentdetails/:id", authenticate, async (req, res) => {
  Schemes.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "Scheme List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

module.exports = router;
