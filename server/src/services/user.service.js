import { UserModel } from '../models/User.model';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';

const encodedToken = (userId) => {
    return JWT.sign(
        {
            iss: 'VuThanhSang',
            sub: userId,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_SECRET,
    );
};
const signUp = async (data) => {
    try {
        const newUser = await UserModel.signUp(data);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

const isValidPassword = async (signInPassword, password) => {
    try {
        return await bcryptjs.compare(signInPassword, password);
    } catch (error) {
        throw new Error(error);
    }
};

export const UserService = { signUp, isValidPassword, encodedToken };
