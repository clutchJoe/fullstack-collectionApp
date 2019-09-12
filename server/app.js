const express = require("express");
const bodyParser = require("body-parser");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./connectDB");
connectDB();

const app = express();

// Setup static floder
app.use(express.static(__dirname + "/public/"));

// Use Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/post", require("./routes/posts"));
app.use("/files", require("./routes/filesAPI.js"));

// app.use(bodyParser.urlencoded({ extended: true }));

const conn = mongoose.connection;
// Init gfs
let gfs;
conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        // Check if image
        if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/png" ||
            file.contentType === "image/gif" ||
            file.contentType === "image/svg+xml" ||
            file.contentType === "image/x-icon"
        ) {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: "Not an image"
            });
        }
    });
});

app.delete("/files/:id", (req, res) => {
    gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        console.log("Successfully deleted !");
        res.status(200).send();
        // res.redirect('/');
    });
});

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`Server running on port ${port}...`));
