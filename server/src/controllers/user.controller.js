import { UserService } from '../services/user.service';
import { HttpStatusCode } from '../utilities/constants';
import Jwt from 'jsonwebtoken';
import passport from 'passport';
let userInfo = null;
let refreshTokenList = [];

const secret = async (req, res, next) => {
    res.status(HttpStatusCode.OK).json({ User: req.user });
};

const login = async (req, res, next) => {
    try {
        const result = await UserService.login(req.body.email, req.body.password);
        const accessToken = UserService.encodedAccessToken(result._id);
        const refreshToken = UserService.encodedRefreshToken(result._id);
        const { password, ...other } = result;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        console.log('accessToken :', accessToken);
        console.log('refreshToken :', refreshToken);
        refreshTokenList.push(refreshToken);
        res.setHeader('token', 'Bearer ' + accessToken);
        res.status(HttpStatusCode.OK).json({ user: other, accessToken: accessToken });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
            ok: 'ok',
        });
    }
};

const register = async (req, res, next) => {
    try {
        const result = await UserService.register(req.body);
        //encoded
        const accessToken = UserService.encodedAccessToken(result._id);
        const refreshToken = UserService.encodedRefreshToken(result._id);
        const { password, ...other } = result;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        refreshTokenList.push(refreshToken);
        res.setHeader('token', 'Bearer ' + accessToken);
        res.status(HttpStatusCode.OK).json({ user: other, accessToken: accessToken });
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
        const accessToken = await UserService.encodedAccessToken(userInfo._id);
        const refreshToken = UserService.encodedRefreshToken(userInfo._id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        refreshTokenList.push(refreshToken);
        console.log('vo day r');
        res.status(HttpStatusCode.OK).json({
            success: true,
            message: 'successfully',
            user: userInfo,
            accessToken: accessToken,
        });
    } else {
        res.json({ success: false, message: 'Error' });
        userInfo = null;
    }
};
const googleCallBack = [
    passport.authenticate('google', {
        failureRedirect: '/signIn/failed',
    }),
    (req, res) => {
        userInfo = req.user;
        res.redirect('http://localhost:3240');
    },
];
const githubCallBack = [
    passport.authenticate('github', {
        failureRedirect: '/signIn/failed',
    }),
    (req, res) => {
        userInfo = req.user;
        res.redirect('http://localhost:3240');
    },
];
const logout = (req, res, next) => {
    res.clearCookie('refreshToken');
    userInfo = null;
    refreshTokenList = refreshTokenList.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json('Logged out successfully');
};

const getAllUser = async (req, res, next) => {
    try {
        const result = await UserService.getAllUser();
        res.status(HttpStatusCode.OK).json({ result: result });
    } catch (error) {
        // res.json(null);
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('refreshToken from cookie: ', refreshToken);
    console.log(refreshTokenList);
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokenList.includes(refreshToken)) {
        return res.status(403).json('RefreshToken is not valid');
    }
    Jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokenList = refreshTokenList.filter((token) => token !== refreshToken);
        const newAccessToken = UserService.encodedAccessToken(user._id);
        const newRefreshToken = UserService.encodedRefreshToken(user._id);
        refreshTokenList.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        res.status(200).json({ accessToken: newAccessToken });
    });
};
const submitCode = async (req, res) => {
    try {
        await UserService.submitCode(req.body, (result) => {
            res.status(HttpStatusCode.OK).json({ data: result });
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
export const UserController = {
    secret,
    login,
    register,
    signUpFailed,
    signInSuccess,
    logout,
    googleCallBack,
    githubCallBack,
    getAllUser,
    refresh,
    submitCode,
};
