var GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const passport=require("passport")

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://meghkhushcreation.netlify.app/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile)
  }
));
module.exports=passport