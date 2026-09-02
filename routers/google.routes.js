const express = require("express");
const passport = require("passport");

const router = express.Router();

const googleController = require("../controllers/google.controller");

// Google Login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// Google Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
        session: false
    }),
    googleController.googleCallback
);

// (Optional) Profile
router.get("/profile", googleController.profilePage);

// Logout
router.get("/logout", googleController.logout);

module.exports = router;