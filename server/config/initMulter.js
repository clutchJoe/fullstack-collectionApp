const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.DB_CONNECT,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    originalname: file.originalname,
                    bucketName: "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});

const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"];

const fileFilter = (req, file, cb) => {
    if (allowTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect File");
        error.code = "Incorrect File Type";
        return cb(error, false);
    }
    cb(null, true);
};

const imageFilter = (req, file, cb) => {
    if (!allowTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect Image File");
        error.code = "Incorrect Image File Type";
        return cb(error, false);
    }
    cb(null, true);
};

const fileUpload = multer({ storage, fileFilter });
const imageUpload = multer({ storage, fileFilter: imageFilter });

// save in local storage
// const storage = multer.diskStorage({
//     destination: "./uploads/",
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage });

module.exports = { fileUpload, imageUpload };
