const express = require("express");

const notesSchema = require("../models/uploadNote");

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await notesSchema.find((err, doc) => {
        if (err) throw err;
        return doc;
    });
    res.status(200).send(data);
});

router.delete("/:id", async (req, res) => {
    const data = await notesSchema.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) throw err;
        return doc;
    });
    console.log(data);
    res.status(200).send();
});

module.exports = router;
