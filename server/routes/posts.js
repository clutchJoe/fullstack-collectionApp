const express = require("express");

const fileSchema = require("../models/uploadsFiles");
const linkSchema = require("../models/uploadLink");
const notesSchema = require("../models/uploadNote");
const { fileUpload, imageUpload } = require("../config/initMulter");

const router = express.Router();

// 若使用 upload.array，req.files，应该用复数
// Upload file route
router.post("/file", fileUpload.single("file"), (req, res) => {
    const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"];
    // res.json({ file: req.file, desc: req.body.text });

    // upload使用single时
    if (allowTypes.includes(req.file.contentType)) {
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

router.post("/image", imageUpload.single("image"), (req, res) => {
    const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"];
    // res.json({ file: req.file, desc: req.body.text });

    // upload使用single时;
    if (allowTypes.includes(req.file.contentType)) {
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
});

router.post("/link", fileUpload.none(), async (req, res) => {
    const post = new linkSchema({
        link: req.body.link,
        description: req.body.text
    });
    try {
        const savePost = await post.save();
        res.status(200).send();
    } catch (err) {
        res.json({ message: err });
    }
});

router.post("/note", fileUpload.none(), async (req, res) => {
    // res.send(req.body);
    const post = new notesSchema({
        topic: req.body.topic,
        note: req.body.text
    });
    try {
        await post.save();
        res.status(200).send();
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
