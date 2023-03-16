const express = require("express");
const router = new express.Router();
const authenticate = require("../middleware/auth");
var ObjectId = require("mongodb").ObjectId;
const moment = require("moment");
const SchemeList = require("../model/schemeslist");
const Payment = require("../model/payments");
const UserScheme = require("../model/userscheme");
const Rate = require("../model/rate");
const Schemes = require("../model/scheme");
router.post("/", async (req, res) => {
  // //   user_id = req.user.id;
  // console.log(user_id);
  const { user_id, scheme, duration, installment, amount } = req.body;
  try {
    // const Checkuser = await SchemeList.find({user_id});
    // if (Checkuser.length >2 ) { return res.status(200).json({ status: false,message: 'Wishlist Already Exists' }) }

    wishlist = new SchemeList({
      user_id,
      scheme,
      duration,
      installment,
      amount,
    });

    await wishlist.save();
    res
      .status(200)
      .send({ status: "true", message: "SchemeList Saved", data: wishlist });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", authenticate, async (req, res) => {
  SchemeList.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "SchemeList Updated Success",
      data: user,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", authenticate, async (req, res) => {
  SchemeList.findByIdAndRemove(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "SchemeList Deleted Success",
      data: user,
    });
  });
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/", authenticate, async (req, res) => {
  user_id = req.user.id;
  try {
    // execute query with page and limit values
    const results = await SchemeList.find({ user_id: user_id })
      .populate("scheme")
      .exec();
    // get total documents in the Posts collection
    const count = await SchemeList.countDocuments();
    const datalist = {
      totalHits: results.length,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "SchemeList List Loading Success",
      data: results,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/user/paymentdetails", authenticate, async (req, res) => {
  user_id = req.user.id;
  // console.log('asdf')
  try {
    const results = await SchemeList.find({ user_id: user_id })
      .populate("scheme")
      .exec();

    // console.log(results)
    var Resultarray = [];
    // console.log(Resultarray)
    // console.log('sdedcdmfghhiwj')
    for (var i in results) {
      val = results[i];
      // console.log(val._id);
      scheme = val.scheme;
      // console.log('asf');
      console.log(scheme);
      // const PAYDETAIL =  await Payment.find({user_id:user_id,scheme:ObjectId(scheme)}).exec();
      const PAYDETAIL = await Payment.find({
        user_id: ObjectId(user_id),
        scheme: ObjectId(scheme),
      }).exec();
      // console.log(PAYDETAIL)
      // console.log(user_id,scheme)

      Totalamt = 0;
      Totalgrm = 0;

      for (var ii in await PAYDETAIL) {
        // console.log('swesdf45yhvaeras')
        valll = PAYDETAIL[ii];
        Totalamt += parseFloat(valll.amount);
        // console.log('xwerfve')
        // console.log(valll.amount)
        Totalgrm += parseFloat(valll.grams);
        // console.log('efcddwd')
        // console.log(valll.grams)
      }

      now = moment();
      console.log("now " + now.toString());
      console.log("start " + now.startOf("month"));
      console.log("end " + now.endOf("month"));
      fdate = new Date(now.startOf("month"));
      //console.log(fddate);

      tdate = new Date(now.endOf("month"));
      console.log(tdate);
      const PAY_BTN_HIDE = await Payment.find({
        scheme: scheme,
        createdAt: { $gte: fdate, $lte: tdate },
      });
      // console.log('sfs')

      schme_duration = results[0].duration;
      schme_startdate = results[0].createdAt;

      schme_enddate = moment(schme_startdate)
        .add(schme_duration, "months")
        .format("YYYY-MM-DD hh:mm:ss");
      // console.log('asdf')

      let userSchemeDetails = await Payment.find({
        user_id: user_id,
        scheme: scheme,
      });

      let SchemeDetails = await Schemes.findById({ _id: ObjectId(scheme) });

      let getInstallment =
        parseInt(SchemeDetails.installment) -
        parseInt(userSchemeDetails.length);

      installmentDetails = {
        pendingInstallment: getInstallment,
        totalPaidInstallment: userSchemeDetails.length,
        totalInstallments: SchemeDetails.installment,
      };

      var Makearray = {
        scheme_id: val.scheme._id,
        duration: val.duration,
        // "installment":val.scheme.installment,
        amount: val.amount,
        scheme_Name: val.scheme.scheme_name,
        scheme_code: val.scheme.scheme_code,
        scheme_min_amount: val.scheme.min_amount,
        scheme_max_amount: val.scheme.max_amount,
        // // "total_installment":val.scheme.installment,
        // "paid_installment":val.scheme.paidinstallment,
        // "pending_installment":val.scheme.pendinginstallment,
        grams: val.scheme.grams,
        rate: val.scheme.rate,
        Status: val.scheme.status,
        user_total_pay: PAYDETAIL.length,
        user_total_amount: await Totalamt,
        user_total_grams: await Totalgrm,
        schme_end: await PAY_BTN_HIDE.length,
        installment_details: installmentDetails,
      };

      Resultarray.push(Makearray);
    }
    res.status(200).send({
      status: "true",
      message: "User Info Success",
      data: Resultarray,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

module.exports = router;
