const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        categories: {type: Array},
        sizes: {type: Array},
        color: {type: Array},
        price: {type: Number, required: true},
        inStock: {type: Boolean, default: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);