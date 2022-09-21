import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { getDB } from '../config/mongodb';
import { UserModel } from '../models/User.model';
import { UserService } from '../services/user.service';
import { env } from '../config/environment';
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
passport.serializeUser(function (user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = getDB().collection('Users').findOne({ _id: id });
    if (user) {
        done(null, user);
    }
});
//passport Jwt
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
            secretOrKey: env.JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await UserModel.findOneById(payload.sub);
                if (!user) return done(null, false);
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
//passport google plus
passport.use(
    new GooglePlusTokenStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existUser = await getDB()
                    .collection('Users')
                    .findOne({ authGoogleId: profile.id, authType: 'google' });
                // exits in DB
                if (existUser) {
                    return done(null, existUser);
                }
                //if new account
                const newUser = await UserModel.signUp({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    authType: 'google',
                    email: profile.emails[0].value,
                    authGoogleId: profile.id,
                });
                done(null, newUser);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
//passport facebook
passport.use(
    new FacebookTokenStrategy(
        {
            clientID: env.FACEBOOK_CLIENT_ID,
            clientSecret: env.FACEBOOK_CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existUser = await getDB()
                    .collection('Users')
                    .findOne({ authFacebookId: profile.id, authType: 'facebook' });
                // exits in DB
                if (existUser) {
                    return done(null, existUser);
                }
                //if new account
                const newUser = await UserModel.signUp({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    authType: 'facebook',
                    email: profile.emails[0].value,
                    authFacebookId: profile.id,
                });
                done(null, newUser);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
//passport local
passport.use(
    new localStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await getDB().collection('Users').findOne({ email: email });
                if (!user) return done(null, false);
                const isCorrectPassword = await UserService.isValidPassword(password, user.password);
                if (!isCorrectPassword) return done(null, false);
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
