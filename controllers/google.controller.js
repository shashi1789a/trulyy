const userModels = require("../models/user-models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateToken } = require("../utils/generateToken");

// Google Callback
exports.googleCallback = async (req, res) => {

    try {

        let user = await userModels.findOne({
            email: req.user.email
        });

        if (!user) {

            const randomPassword = crypto.randomBytes(32).toString("hex");

            const hash = await bcrypt.hash(randomPassword, 10);

            user = await userModels.create({
                fullname: req.user.displayName,
                email: req.user.email,
                phnumber: "",
                password: hash,
                googleId: req.user.googleId,
                photo: req.user.photo
            });

        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.redirect("/home");

    } catch (error) {

        console.log(error);

        return res.redirect("/");

    }

};

// Optional
exports.profilePage = (req, res) => {

    res.render("auth/profile", {
        user: req.user
    });

};

exports.logout = (req, res) => {

    res.clearCookie("token");

    res.redirect("/");

};