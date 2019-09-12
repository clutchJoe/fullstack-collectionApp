const express = require("express");

const fileSchema = require("../models/uploadsFiles");

const router = express.Router();

router.get("/", async (req, res) => {
    // gfs.files.find().toArray((err, files) => {
    //     if (!files || files.length === 0) {
    //         return res.status(404).json({
    //             err: "No files exist"
    //         });
    //     }
    //     return res.json(files);
    // });
    const data = await fileSchema.find((err, doc) => {
        if (err) throw err;
        return doc;
    });
    res.send(data);
});

router.get("/:filename", async (req, res) => {
    const data = await fileSchema.findOne({ _filename: req.param.filename }, (err, file) => {
        if (err) throw err;
        return file;
    });
    res.send(data);
});

module.exports = router;
