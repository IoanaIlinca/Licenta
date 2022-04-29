const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        key: {type: String, unique: true},
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema);