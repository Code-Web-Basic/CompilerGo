import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { getDB } from '../config/mongodb';
import { UserModel } from '../models/User.model';
import { UserService } from '../services/user.service';
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
passport.serializeUser(function (user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // User.findById(id, function (err, user) {
    //     console.log(err);
    //     done(err, user);
    // });
    const user = getDB().collection('Users').findOne({ _id: id });
    if (user) {
        done(null, user);
    }
});
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
            secretOrKey: process.env.JWT_SECRET,
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
