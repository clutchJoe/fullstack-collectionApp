const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const usersSchema = require("../models/users");
const { checkAuthenticated, checkNotAuthenticated } = require("../config/auth");

const router = express.Router();

const bodyParser = express.urlencoded({ extended: false });

router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login");
});
router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register");
});
router.post("/register", bodyParser, checkNotAuthenticated, (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];
    if (!name || !email || !password) errors.push({ msg: "Please fill in all fileds" });
    if (password.length < 6) errors.push({ msg: "Password should be at least 6 characers" });
    if (name.length < 3) errors.push({ msg: "Name should be at least 3 characers" });

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password
        });
    } else {
        usersSchema.findOne({ email: email }).then(user => {
            if (user) {
                //User exits
                errors.push({ msg: "Email is already registered" });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password
                });
            } else {
                function hashedPassword() {
                    return bcrypt.hash(req.body.password, 10);
                }
                hashedPassword()
                    .then(password => {
                        return new usersSchema({
                            name: req.body.name,
                            email: req.body.email,
                            password
                        });
                    })
                    .then(post => {
                        post.save();
                    })
                    .then(user => {
                        res.redirect("login");
                    })
                    .catch(err => console.error(err));

                // const hashedPassword = await bcrypt.hash(req.body.password, 10);
                // const post = new usersSchema({
                //     name: req.body.name,
                //     email: req.body.email,
                //     password: hashedPassword
                // });
                // try {
                //     const savePost = await post.save();
                //     console.log(savePost);
                //     res.redirect("/login");
                // } catch (err) {
                //     console.error(err);
                // }
            }
        });
    }

    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const post = new usersSchema({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword
    // });
    // try {
    //     const savePost = await post.save();
    //     console.log(savePost);
    //     res.redirect("/login");
    // } catch (err) {
    //     res.redirect("/register");
    // }
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
    } catch (err) {
        throw err;
    }
});

module.exports = router;
