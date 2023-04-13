const express = require("express");

const pricelistRouter = new express.Router();
const authenticate = require("../middleware/auth");
const PriceList = require("../model/price");

/////////////////// CREATE Slider DATA ////////////////////////////

pricelistRouter.post("/add", async (req, res) => {
  const { min_price, max_price } = req.body;
  //   console.log(req.body)
  try {
    const pricedata = new PriceList({
      min_price,
      max_price,
    });
    await pricedata.save();
    res.status(200).send({
      status: "true",
      message: "Price List Loading Success",
      data: pricedata,
    });
  } catch (error) {
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

//////////////////////  UPDATE Slider DATA /////////////////////

pricelistRouter.put("/:id", async (req, res) => {
  PriceList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Price List Updated Success",
      data: banner,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
pricelistRouter.delete("/:id", async (req, res) => {
  PriceList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, Slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Price List Deleted Success",
      data: banner,
    });
  });
});

/////////////////////// GET Slider DATA //////////////////////

pricelistRouter.get("/get_pricelist", async (req, res) => {
  try {
    const results = await PriceList.find({});
    const count = await PriceList.countDocuments();
    const bannerdata1 = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "Price List Loading Success",
      data: bannerdata1,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

pricelistRouter.get("/:id", async (req, res) => {
  PriceList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "Price List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

module.exports = pricelistRouter;
