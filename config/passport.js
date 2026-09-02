require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user-models"); // Path apne project ke hisaab se check kar lena

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },

        async (accessToken, refreshToken, profile, done) => {
            try {

                const email = profile.emails[0].value;

                // Existing user check
                let user = await User.findOne({ email });

                // Agar user nahi mila to create karo
                if (!user) {

                    user = await User.create({

                        fullname: profile.displayName,

                        email: email,

                        // Google password nahi deta
                        // Isliye random string ya hashed password save karo
                        password: "GOOGLE_LOGIN",

                        phnumber: "",

                        googleId: profile.id,

                        photo: profile.photos[0].value

                    });

                }

                // User passport ko return karo
                return done(null, user);

            } catch (error) {

                return done(error, null);

            }
        }
    )
);

// Session Support
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {

    try {

        const user = await User.findById(id);

        done(null, user);

    } catch (error) {

        done(error, null);

    }

});

module.exports = passport;