const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const {request} = require("express");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
   const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedProduct = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// GET
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            if (!qCategory) {
                products = await Product.find().sort({_id: -1}).limit(5);
            }
            else {
                products = await Product.find({
                    categories: {
                        $in: [qCategory]
                    }
                }).sort({_id: -1}).limit(5);
            }
        }
       else {
            if (!qCategory) {
                products = await Product.find();
            }
            else {
                products = await Product.find({
                    categories: {
                        $in: [qCategory]
                    }
                });
            }
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;