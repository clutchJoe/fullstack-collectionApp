const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
    {
        link: String,
        domain: {
            type: String,
            required: true
        },
        title: {
            type: String
        },
        description: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { collection: "links" }
);

module.exports = mongoose.model("linkSchema", linkSchema, "links");
