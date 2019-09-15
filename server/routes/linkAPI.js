const express = require("express");

const linksSchema = require("../models/uploadLink");

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await linksSchema.find((err, doc) => {
        if (err) throw err;
        return doc;
    });
    res.status(200).send(data);
});

router.delete("/:id", async (req, res) => {
    const data = await linksSchema.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) throw err;
        return doc;
    });
    console.log(data);
    res.status(200).send();
});

module.exports = router;
