const express = require("express");

const optionRouter = new express.Router();
const authenticate = require("../middleware/auth");
const Option = require("../model/option");

/////////////////// CREATE Slider DATA ////////////////////////////

optionRouter.post("/add", async (req, res) => {
  const { title, image } = req.body;
  //   console.log(req.body)
  try {
    const optiondata = new Option({
      title,
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

optionRouter.put("/:id", async (req, res) => {
  Option.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
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
optionRouter.delete("/:id", async (req, res) => {
  Option.findByIdAndUpdate(req.params.id, { status: 0 }, (err, Slider) => {
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

optionRouter.get("/get_option", async (req, res) => {
  try {
    const results = await Option.find({});
    const count = await Option.countDocuments();
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

optionRouter.get("/:id", async (req, res) => {
  Option.find({ _id: req.params.id }, (err, docs) => {
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

module.exports = optionRouter;
