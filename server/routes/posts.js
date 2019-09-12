const express = require("express");

const fileSchema = require("../models/uploadsFiles");
const upload = require("../initMulter");

const router = express.Router();

// 若使用 upload.array，req.files，应该用复数
router.post("/", upload.single("file"), (req, res) => {
    // res.json({ file: req.file, desc: req.body.text });

    // upload使用single时
    if (
        req.file.contentType === "image/jpeg" ||
        req.file.contentType === "image/png" ||
        req.file.contentType === "image/gif" ||
        req.file.contentType === "image/svg+xml" ||
        req.file.contentType === "image/x-icon"
    ) {
        fileSchema.updateOne(
            { _id: req.file.id },
            { description: req.body.text, originalname: req.file.originalname, isImg: true },
            (err, raw) => {
                console.log(raw);
            }
        );
    } else {
        fileSchema.updateOne(
            { _id: req.file.id },
            { description: req.body.text, originalname: req.file.originalname, isImg: false },
            (err, raw) => {
                console.log(raw);
            }
        );
    }
    res.status(200).send();
    // upload使用array时
    // req.files.forEach(file => {
    //     fileSchema.updateOne(
    //         { _id: file.id },
    //         { description: req.body.text, originalname: file.originalname },
    //         (err, raw) => {
    //             console.log(raw);
    //         }
    //     );
    // });

    // console.log(req.file, req.body.text);
});

module.exports = router;
