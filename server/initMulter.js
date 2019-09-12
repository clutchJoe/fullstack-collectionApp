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
const upload = multer({ storage });

// save in local storage
// const storage = multer.diskStorage({
//     destination: "./uploads/",
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage });

module.exports = upload;
