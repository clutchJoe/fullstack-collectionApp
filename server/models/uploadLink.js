const mongoose = require("mongoose");

const linksSchema = new mongoose.Schema(
    {
        link: String,
        description: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { collection: "links" }
);

module.exports = mongoose.model("linksSchema", linksSchema, "links");
