import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { getDB } from '../config/mongodb';
import { UserModel } from '../models/User.model';
import { UserService } from '../services/user.service';
import { env } from '../config/environment';
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (user, done) {
    const newUser = await getDB().collection('Users').findOne({ _id: user._id });
    if (newUser) {
        done(null, newUser);
    }
    done(null, user);
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
//passport  google
passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3240/v1/users/auth/google/callback',
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
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
                return done(null, newUser);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);
passport.use(
    new GithubStrategy(
        {
            clientID: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:3240/v1/users/auth/github/callback',
            passReqToCallback: true,
            proxy: true,
            scope: ['user:email'], //This is all it takes to get emails
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const existUser = await getDB()
                    .collection('Users')
                    .findOne({ authGithubId: profile.id, authType: 'github' });
                // exits in DB
                if (existUser) {
                    return done(null, existUser);
                }
                //if new account
                const newUser = await UserModel.signUp({
                    firstName: profile.username,
                    authType: 'github',
                    email: profile.emails[0].value,
                    authGithubId: profile.id,
                });
                return done(null, newUser);
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
