const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');
const { config } = require('../../../config');
const MongoLib = require('../../../lib/mongo');

passport.use(
    new Strategy({
        secretOrKey: config.authJwtSecret,  //<--My secret from config file
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()    //<--Extract the access token from an auth header of type bearer
    },
        async (tokenPayload, callback) => {
            const mongoDB = new MongoLib();

            try {
                const [user] = await mongoDB.getAll('users', {
                    username: tokenPayload.sub
                });

                if (!user) {
                    return callback(boom.unauthorized);
                }

                return callback(null, user);
            } catch (error) {
                return callback(error)
            }
        }
    )
);