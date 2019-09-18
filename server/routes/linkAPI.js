const express = require("express");

const linkSchema = require("../models/uploadLink");

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await linkSchema.find((err, doc) => {
        if (err) throw err;
        return doc;
    });
    res.status(200).send(data);
});

router.delete("/:id", async (req, res) => {
    await linkSchema.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) throw err;
        return doc;
    });
    res.status(200).send();
});

module.exports = router;
