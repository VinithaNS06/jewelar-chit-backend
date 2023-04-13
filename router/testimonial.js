const express = require("express");

const testimonialRouter = new express.Router();
const authenticate = require("../middleware/auth");
const TestimonialList = require("../model/testimonial");

/////////////////// CREATE Slider DATA ////////////////////////////

testimonialRouter.post("/add", async (req, res) => {
  const { name, content, image } = req.body;
  //   console.log(req.body)
  try {
    const testdata = new TestimonialList({
      name,
      content,
      image,
    });
    await testdata.save();
    res.status(200).send({
      status: "true",
      message: "Testimonials List Loading Success",
      data: testdata,
    });
  } catch (error) {
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

//////////////////////  UPDATE Slider DATA /////////////////////

testimonialRouter.put("/:id", async (req, res) => {
  TestimonialList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Testimonials List Updated Success",
      data: banner,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
testimonialRouter.delete("/:id", async (req, res) => {
  TestimonialList.findByIdAndUpdate(
    req.params.id,
    { status: 0 },
    (err, Slider) => {
      if (err) {
        return res
          .status(200)
          .send({ status: "false", message: "Error", errors: err });
      }
      res.status(200).send({
        status: "true",
        message: "Testimonials List Deleted Success",
        data: banner,
      });
    }
  );
});

/////////////////////// GET Slider DATA //////////////////////

testimonialRouter.get("/get_test", async (req, res) => {
  try {
    const results = await TestimonialList.find({});
    const count = await TestimonialList.countDocuments();
    const bannerdata1 = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "Testimonials List Loading Success",
      data: bannerdata1,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

testimonialRouter.get("/:id", async (req, res) => {
  TestimonialList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "Testimonials List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

module.exports = testimonialRouter;
