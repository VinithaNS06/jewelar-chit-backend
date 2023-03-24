const express = require("express");
const UserScheme = require("../model/userscheme");
const router = new express.Router();
const authenticate = require("../middleware/auth");
const Scheme = require("../model/scheme");
const Customer = require("../model/cutomer");
const Transaction = require("../model/transaction");
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
router.get("/getuserscheme", authenticate, async (req, res) => {
  try {
    const results = await UserScheme.find({}).populate(["user_id", "scheme"]);

    // return res.send(results);
    let Resultarray = [];

    for (let i = 0; i < results.length; i++) {
      Resultarray.push({
        user_id: results[i]._id,
        user_name: results[i].user_id.name,
        user_Phone: results[i].user_id.phone,
        user_address: results[i].user_id.address,
        user_schemename: results[i].scheme.scheme_name,
        user_schemecode: results[i].scheme.scheme_code,
        user_scheme_duration: results[i].scheme.duration,
        user_scheme_installment: results[i].scheme.installment,
        user_scheme_amount: results[i].scheme.amount,
        transactionid: results[i].transation_id,
        amount: results[i].amount,
        paymentstatus: results[i].payment_status,
      });
    }

    res.status(200).send({
      status: "true",
      message: "UserScheme List Loading Success",
      data: Resultarray,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

// router.get("/:id", authenticate, async (req, res) => {
//   scheme = req.params.id;
//   try {
//     // execute query with page and limit values
//     const results = await UserScheme.find({ _id: scheme }).exec();
//     const datalist = {
//       totalHits: results.length,
//       results,
//     };
//     res.status(200).send({
//       status: "true",
//       message: "UserScheme List Loading Success",
//       data: datalist,
//     });
//   } catch (err) {
//     res
//       .status(200)
//       .send({ status: "false", message: "Error in Solving", data: err });
//   }
// });

router.get("/:id", authenticate, async (req, res) => {
  const schemeId = req.params.id;
  try {
    const scheme = await Scheme.findById(schemeId);

    const transactions = await Transaction.find({ schemeId: schemeId });

    const customers = [];
    for (const transaction of transactions) {
      const customerId = transaction.customerId;
      const customer = await Customer.findById(customerId);
      customers.push(customer);
    }

    const data = {
      scheme: scheme,
      transactions: transactions,
      customers: customers,
    };
    res.status(200).send({
      status: "true",
      message:
        "Scheme, transaction, and customer information retrieved successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      status: "false",
      message: "Error retrieving scheme, transaction, and customer information",
      data: err,
    });
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
