const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const usersSchema = require("../models/users");
const { checkAuthenticated, checkNotAuthenticated } = require("../config/auth");

const router = express.Router();

const bodyParser = express.urlencoded({ extended: false });

// router.get("/dashboard", checkAuthenticated, (req, res) => {
//     res.render("dashboard");
// });
// router.get("/", checkAuthenticated, (req, res) => {
//     res.sendFile(__dirname + "/public/dist/index.html");
// });

router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login");
});
router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register");
});
router.post("/register", bodyParser, checkNotAuthenticated, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const post = new usersSchema({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savePost = await post.save();
        console.log(savePost);
        res.redirect("/login");
    } catch (err) {
        res.redirect("/register");
    }
});

router.post("/login", bodyParser, checkNotAuthenticated, (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
});

router.delete("/logout", (req, res) => {
    try {
        req.logOut();
        res.redirect("/login");
        // console.log("Succfully logout !");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
