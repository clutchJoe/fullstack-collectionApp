const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        description: String,
        originalname: String,
        isImg: Boolean
    },
    { collection: "uploads.files" }
);

module.exports = mongoose.model("fileSchema", fileSchema, "uploads.files");
