const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { collection: "users" }
);

module.exports = mongoose.model("usersSchema", usersSchema, "users");
