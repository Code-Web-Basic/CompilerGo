import { UserService } from '../services/user.service';
import { HttpStatusCode } from '../utilities/constants';
import passport from 'passport';
let userInfo = null;
const secret = async (req, res, next) => {
    res.status(HttpStatusCode.OK).json({ User: req.user });
};

const signIn = async (req, res, next) => {
    try {
        const token = UserService.encodedToken(req.user._id);
        res.setHeader('Authorization', token);
        res.status(HttpStatusCode.OK).json({ user: req.user });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const signUp = async (req, res, next) => {
    try {
        const result = await UserService.signUp(req.body);
        //encoded
        const token = UserService.encodedToken(result._id);
        res.setHeader('Authorization', token);
        res.status(HttpStatusCode.OK).json({ result: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const signUpFailed = (req, res, next) => {
    res.status(401).json({ error: 404 });
};
const signInSuccess = async (req, res) => {
    if (userInfo !== null) {
        const token = await UserService.encodedToken(userInfo);
        res.status(HttpStatusCode.OK).json({ success: true, message: 'successfully', user: userInfo, token: token });
    } else {
        res.json({ error: 'error' });
    }
};
const googleCallBack = [
    passport.authenticate('google', {
        failureRedirect: '/signIn/failed',
    }),
    (req, res) => {
        userInfo = req.user;
        res.redirect('http://localhost:3000');
    },
];
const githubCallBack = [
    passport.authenticate('github', {
        failureRedirect: '/signIn/failed',
    }),
    (req, res) => {
        userInfo = req.user;
        res.redirect('http://localhost:3000');
    },
];
const signOut = (req, res, next) => {
    req.logout();
    res.redirect('http://localhost:3000');
};
export const UserController = {
    secret,
    signIn,
    signUp,
    signUpFailed,
    signInSuccess,
    signOut,
    googleCallBack,
    githubCallBack,
};
