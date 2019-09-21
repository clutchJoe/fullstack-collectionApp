const express = require("express");
const bodyParser = require("body-parser");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const flash = require("express-flash");

const { checkAuthenticated } = require("./config/auth");

const connectDB = require("./config/connectDB");
// Connect to MongoDB
connectDB();

const app = express();
const options = {
    dotfiles: "deny",
    redirect: false,
    extensions: ["htm", "html"]
};

require("./config/passport")(passport);
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.set("view engine", "ejs");

// Use Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(flash());

//Express Session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/user"));
app.use("/post", require("./routes/posts"));
app.use("/files", require("./routes/filesAPI"));
app.use("/notes", require("./routes/notesAPI"));
app.use("/links", require("./routes/linkAPI"));

// Setup static floder
app.use(checkAuthenticated, express.static(__dirname + "/public/dist/"));

app.use((err, req, res, next) => {
    if (err.code === "Incorrect File Type") {
        res.status(422).json({ error: "Only file are allowed!" });
        return;
    }
    if (err.code === "Incorrect Image File Type") {
        res.status(422).json({ error: "Only image are allowed!" });
        return;
    }
});

const conn = mongoose.connection;
// Init gfs
let gfs;
conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

// app.get("/", checkAuthenticated, (req, res) => res.sendFile(__dirname + "/public/dist/index.html"));

app.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        // Check if image
        const allowTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml", "image/x-icon"];
        if (allowTypes.includes(file.contentType)) {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).send('err: "Not an image"');
        }
    });
});

// file download route
app.post("/download/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
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
