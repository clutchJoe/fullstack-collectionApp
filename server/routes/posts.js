const express = require("express");
const cheerio = require("cheerio");
const rp = require("request-promise");

const fileSchema = require("../models/uploadsFiles");
const linkSchema = require("../models/uploadLink");
const notesSchema = require("../models/uploadNote");
const { fileUpload, imageUpload } = require("../config/initMulter");

const router = express.Router();

// 若使用 upload.array，req.files，应该用复数
// Upload file route
router.post("/file", fileUpload.single("file"), (req, res) => {
    const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"];
    // upload使用single时
    if (allowTypes.includes(req.file.contentType)) {
        fileSchema
            .updateOne({ _id: req.file.id }, { description: req.body.text, originalname: req.file.originalname, isImg: true })
            .exec();
    } else {
        fileSchema
            .updateOne({ _id: req.file.id }, { description: req.body.text, originalname: req.file.originalname, isImg: false })
            .exec();
    }
    res.status(200).send();
});

router.post("/image", imageUpload.array("image", 5), (req, res) => {
    const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"];
    // upload使用array时
    req.files.forEach(file => {
        if (allowTypes.includes(file.contentType)) {
            fileSchema
                .updateOne({ _id: file.id }, { description: req.body.text, originalname: file.originalname, isImg: true })
                .exec();
        } else {
            fileSchema
                .updateOne({ _id: file.id }, { description: req.body.text, originalname: file.originalname, isImg: false })
                .exec();
        }
    });
    res.status(200).send();
});

router.post("/link", fileUpload.none(), async (req, res) => {
    const options = {
        uri: req.body.link,
        transform: function(body) {
            return cheerio.load(body);
        }
    };
    rp(options)
        .then(function($) {
            const text = $("head > title").text();
            return text;
        })
        .then(text => {
            let domain = "";
            const arr = req.body.link.split("/");
            if (arr[2].startsWith("www.")) {
                domain = arr[2].slice(4);
            } else {
                domain = arr[2];
            }
            const post = new linkSchema({
                link: req.body.link,
                domain: domain,
                title: text,
                description: req.body.text
            });
            return post;
        })
        .then(post => {
            post.save();
            res.status(200).send();
        })
        .catch(err => res.json({ message: err }));
});

router.post("/note", fileUpload.none(), async (req, res) => {
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
