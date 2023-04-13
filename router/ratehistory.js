const express = require("express");
const Rate1 = require("../model/rate");
const RateHistory = require("../model/ratehistory");

const router = new express.Router();

router.post("/", async (req, res) => {
  const { rate_id, rate, date_on } = req.body;

  try {
    Rate1.updateOne(
      { _id: `${rate_id}` },
      {
        $set: {
          rate: rate,
        },
      },
      function (err, res) {
        if (err) throw err;
      }
    );
    const ratelist = new RateHistory({
      rate_id,
      rate,
      date_on,
    });
    ratelist.save();

    res
      .status(200)
      .send({ status: "true", message: "RateHistory Saved", data: ratelist });
  } catch (err) {
    // console.log(err.message)
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/* ////////////////////////////////////////  GET RATE HISTORY  ////////////////////////////////// ///*/
router.get("/get_rate_history", async (req, res) => {
  //user_id = req.user.id;
  try {
    // execute query with page and limit values
    const results = await RateHistory.find({}).exec();
    const datalist = {
      totalHits: results.length,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "Rate List Loading Success",
      data: results,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

module.exports = router;
