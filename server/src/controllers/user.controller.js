import { UserService } from '../services/user.service';
import { HttpStatusCode } from '../utilities/constants';

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

const authGoogle = async (req, res, next) => {
    const token = UserService.encodedToken(req.user._id);
    res.setHeader('Authorization', token);
    res.status(HttpStatusCode.OK).json({ user: req.user });
};
const authFacebook = async (req, res, next) => {
    const token = UserService.encodedToken(req.user._id);
    res.setHeader('Authorization', token);
    res.status(HttpStatusCode.OK).json({ user: req.user });
    // console.log('req user', req.user);
};

export const UserController = { secret, signIn, signUp, authGoogle, authFacebook };
