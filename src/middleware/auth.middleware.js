const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwtSecret = require("../../config").api.jwtSecret;

const UsersController = require("../users/users.controllers");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(options, async (tokenDecoded, done) => {
    try {
      const user = await UsersController.findUserById(tokenDecoded.id);

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      return done(null, tokenDecoded);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
