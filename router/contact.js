const express = require("express");

const contactlistRouter = new express.Router();
const authenticate = require("../middleware/auth");
const ContactList = require("../model/contact");

/////////////////// CREATE Slider DATA ////////////////////////////

contactlistRouter.post("/add", async (req, res) => {
  const { mobilenum, whatsappnum, address, fburl, instaurl, whatsappurl } =
    req.body;
  //   console.log(req.body)
  try {
    const optiondata = new ContactList({
      mobilenum,
      whatsappnum,
      address,
      fburl,
      instaurl,
      whatsappurl,
    });
    await optiondata.save();
    res.status(200).send({
      status: "true",
      message: "Contact Loading Success",
      data: optiondata,
    });
  } catch (error) {
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

//////////////////////  UPDATE Slider DATA /////////////////////

contactlistRouter.put("/:id", async (req, res) => {
  ContactList.findByIdAndUpdate(req.params.id, req.body, (err, slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Contact Updated Success",
      data: banner,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
contactlistRouter.delete("/:id", async (req, res) => {
  ContactList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, Slider) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "Contact Deleted Success",
      data: banner,
    });
  });
});

/////////////////////// GET Slider DATA //////////////////////

contactlistRouter.get("/get_contact", async (req, res) => {
  try {
    const results = await ContactList.find({});
    const count = await ContactList.countDocuments();
    const bannerdata1 = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "Contact Loading Success",
      data: bannerdata1,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

contactlistRouter.get("/:id", async (req, res) => {
  ContactList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "Contact Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

module.exports = contactlistRouter;
