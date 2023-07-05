const path = require('path');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require(path.resolve(__dirname, '..', '..', 'config'));

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});

module.exports = JwtStrategy;
