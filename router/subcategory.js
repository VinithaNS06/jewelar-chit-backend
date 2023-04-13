const express = require("express");
const router = new express.Router();

const authenticate = require("../middleware/auth");
const SubCategory = require("../model/subcategory");

router.post("/create", authenticate, async (req, res) => {
  const { name, category_id, image } = req.body;

  try {
    const Checkuser = await SubCategory.findOne({ name, category_id });
    if (Checkuser) {
      return res
        .status(200)
        .json({ status: false, message: "SubCategory Already Exists" });
    }
    category = new SubCategory({
      name,
      category_id,
      image,
    });
    await category.save();
    res
      .status(200)
      .send({ status: "true", message: "SubCategory Saved", data: category });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", async (req, res) => {
  SubCategory.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "SubCategory Updated Success",
      data: user,
    });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", async (req, res) => {
  SubCategory.findByIdAndUpdate(req.params.id, { status: 0 }, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res.status(200).send({
      status: "true",
      message: "SubCategory Deleted Success",
      data: user,
    });
  });
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/", async (req, res) => {
  try {
    // execute query with page and limit values
    const results = await SubCategory.find({}).exec();
    // get total documents in the Posts collection
    const count = await SubCategory.countDocuments();
    const datalist = {
      totalHits: count,
      results,
    };
    res.status(200).send({
      status: "true",
      message: "SubCategory List Loading Success",
      data: datalist,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY Category ID  ////////////////////////////////// ///*/
router.get("/:id", authenticate, async (req, res) => {
  SubCategory.find({ category_id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "SubCategory List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});
////////////////////////////////// GET CATEGORY BY ID ///////////////////////////////////
router.get("/subcat/:id", authenticate, async (req, res) => {
  SubCategory.find({ _id: req.params.id }, (err, results) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "SubCategory List Loading Success",
        data: results,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});
module.exports = router;
