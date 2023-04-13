const express = require("express");

const optionlistRouter = new express.Router();
const authenticate = require("../middleware/auth");
const BannerList = require("../model/banner");
const OptionList = require("../model/optionlist");

/////////////////// CREATE Slider DATA ////////////////////////////

optionlistRouter.post("/add", async (req, res) => {
  const { order, title, content, image } = req.body;
  //   console.log(req.body)
  try {
    const optiondata = new OptionList({
      order,
      title,
      content,
      image,
    });
    await optiondata.save();
    res.status(200).send({
      status: "true",
      message: "Option List Loading Success",
      data: optiondata,
    });
  } catch (error) {
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

//////////////////////  UPDATE Slider DATA /////////////////////

optionlistRouter.put("/:id", async (req, res) => {
  OptionList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Option List Updated Success",
      data: banner,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
optionlistRouter.delete("/:id", async (req, res) => {
  OptionList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, Slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Option List Deleted Success",
      data: banner,
    });
  });
});

/////////////////////// GET Slider DATA //////////////////////

optionlistRouter.get("/get_optionlist", async (req, res) => {
  try {
    const results = await OptionList.find({});
    const count = await OptionList.countDocuments();
    const bannerdata1 = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "Option List Loading Success",
      data: bannerdata1,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

optionlistRouter.get("/:id", async (req, res) => {
  OptionList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "Option List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

module.exports = optionlistRouter;
