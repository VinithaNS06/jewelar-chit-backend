const express = require("express");
const router = new express.Router();
const Product = require("../model/products");
const authenticate = require("../middleware/auth");
const { ObjectId } = require("mongodb");
const ProductList = require("../model/productlist");
// const Category = require('../model/category');

router.post("/", async (req, res) => {
  const {
    name,
    image,
    maincategory,
    subcategory,
    occasion,
    gender,
    productImages,
    grams,
    rate,
    metalMrp,
    metalSellingPrice,
    metalPurity,
    metalWeight,
    metalDiscount,
    metalFinalValue,
    stoneMrp,
    stoneSellingPrice,
    stoneWeight,
    stoneCount,
    stoneDiscount,
    stoneFinalValue,
    makingCharge,
    makingDiscount,
    makingFinalValue,
    wastageCharge,
    wastageDiscount,
    wastageWeight,
    wastageFinalValue,
    totalValue,
    totalDiscount,
    totalFinalValue,
    gstPercentage,
    gstValue,
    gstDiscount,
    gstFinalValue,
    grandTotalValue,
    grandTotalDiscount,
    grandFinalValue,
  } = req.body;
  try {
    const CheckProdcuts = await ProductList.findOne({
      name,
      image,
      maincategory,
      subcategory,
      occasion,
      gender,
    });
    if (CheckProdcuts) {
      return res
        .status(200)
        .json({ status: false, message: "Prodcut Already Exists" });
    }
    productdata = new ProductList({
      name,
      image,
      maincategory,
      subcategory,
      occasion,
      gender,
      productImages,
      grams,
      rate,
      metalMrp,
      metalSellingPrice,
      metalPurity,
      metalWeight,
      metalDiscount,
      metalFinalValue,
      stoneMrp,
      stoneSellingPrice,
      stoneWeight,
      stoneCount,
      stoneDiscount,
      stoneFinalValue,
      makingCharge,
      makingDiscount,
      makingFinalValue,
      wastageCharge,
      wastageDiscount,
      wastageWeight,
      wastageFinalValue,
      totalValue,
      totalDiscount,
      totalFinalValue,
      gstPercentage,
      gstValue,
      gstDiscount,
      gstFinalValue,
      grandTotalValue,
      grandTotalDiscount,
      grandFinalValue,
    });
    await productdata.save();
    res
      .status(200)
      .send({ status: "true", message: "Product Saved", data: productdata });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ status: "false", message: "Error in Solving" });
  }
});

/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put("/:id", async (req, res) => {
  ProductList.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res
      .status(200)
      .send({ status: "true", message: "Product Updated Success", data: user });
  });
});

/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete("/:id", async (req, res) => {
  ProductList.findByIdAndUpdate(req.params.id, { status: 0 }, (err, user) => {
    if (err) {
      return res
        .status(200)
        .send({ status: "false", message: "Error", errors: err });
    }
    res
      .status(200)
      .send({ status: "true", message: "Product Deleted Success", data: user });
  });
});

/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/getproduct", async (req, res) => {
  try {
    const results = await ProductList.find({ status: 1 });
    res.status(200).send({
      status: "true",
      message: "Product List Loading Success",
      data: results,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductList.findById(req.params.id);

    const totalPrice = (product.grams * product.rate).toFixed(2);
    // console.log(`Total price: ${totalPrice}`);

    res.status(200).send({
      status: "true",
      message: "Product List Loading Success",
      data: product,
      totalPrice: totalPrice,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});

/* ////////////////////////////////////////  GET BY PRODUCT ID  ////////////////////////////////// ///*/
router.get("/byprduct/:id", async (req, res) => {
  ProductList.find({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send({
        status: "true",
        message: "Product List Loading Success",
        data: docs,
      });
    } else {
      res
        .status(200)
        .send({ status: "false", message: "Error in Solving", data: err });
    }
  });
});

router.get("/productlist", async (req, res) => {
  try {
    // execute query with page and limit values

    const productdata = await ProductList.find({ status: 1 }).populate("_id");

    // return res.send(productdata)
    let makeArray = [];
    for (let i = 0; i < productdata.length; i++) {
      makeArray.push({
        productid: productdata[i]._id,
        product_name: productdata[i].title,
        product_title: productdata[i].product,
        product_desc: productdata[i].remark,
        product_price: productdata[i].price,
        product_secondary_price: productdata[i].secondaryprice,
        product_image: productdata[i].image,
        product_secondary_image: productdata[i].secondaryimage,
        product_type: productdata[i].productType,
      });
    }

    res.status(200).send({
      status: "true",
      message: "Product List Loading Success",
      data: makeArray,
    });
  } catch (err) {
    res
      .status(200)
      .send({ status: "false", message: "Error in Solving", data: err });
  }
});
module.exports = router;
