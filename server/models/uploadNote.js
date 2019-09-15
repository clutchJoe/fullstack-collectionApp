const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        topic: String,
        note: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { collection: "notes" }
);

module.exports = mongoose.model("notesSchema", notesSchema, "notes");
