const express = require("express");

const aboutlistRouter = new express.Router();
const authenticate = require("../middleware/auth");
const AboutList = require("../model/about");

/////////////////// CREATE Slider DATA ////////////////////////////

aboutlistRouter.post("/add", async (req, res) => {
  const { title, content, experience, image, buttonname } = req.body;
  //   console.log(req.body)
  try {
    const optiondata = new AboutList({
      title,
      content,
      experience,
      image,
      buttonname,
    });
    await optiondata.save();
    res.status(200).send({
      status: "true",
      message: "About Loading Success",
      data: optiondata,
    });
  } catch (error) {
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

//////////////////////  UPDATE Slider DATA /////////////////////

aboutlistRouter.put("/:id", async (req, res) => {
  AboutList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "About Updated Success",
      data: banner,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
aboutlistRouter.delete("/:id", async (req, res) => {
  AboutList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, Slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "About Deleted Success",
      data: banner,
    });
  });
});

/////////////////////// GET Slider DATA //////////////////////

aboutlistRouter.get("/get_about", async (req, res) => {
  try {
    const results = await AboutList.find({});
    const count = await AboutList.countDocuments();
    const bannerdata1 = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "About Loading Success",
      data: bannerdata1,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

aboutlistRouter.get("/:id", async (req, res) => {
  AboutList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "About Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

module.exports = aboutlistRouter;
