const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true, unique: true},
        products: [
            {
                _id: {
                    type: String
                },
                size: {
                    type: String
                },
                color: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", cartSchema);