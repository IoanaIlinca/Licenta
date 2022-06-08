const Cart = require("../models/Cart");
const Product = require("../models/Product");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/",async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id",  async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.params.id},
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER CART
router.get("/user/:userId", async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            let newCart = { userId:  cart.userId,
                products: []};
            for (let index in cart.products) {
                let product = await Product.findOne({_id: cart.products[index]._id});
                let newProduct = {
                    _id: product._id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    quantity: cart.products[index].quantity,
                    color: cart.products[index].color,
                    size: cart.products[index].size
                }
                newCart.products.push(newProduct);

            }
            res.status(200).json(newCart);
        }
        else {
            res.status(200).json(cart);
        }


    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;