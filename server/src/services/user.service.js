import { UserModel } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { any } from 'joi';

const encodedAccessToken = (userId) => {
    return JWT.sign(
        {
            iss: 'VuThanhSang',
            sub: userId,
            // iat: new Date().getTime(),
            // exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '20s',
        },
    );
};

const encodedRefreshToken = (userId) => {
    return JWT.sign(
        {
            iss: 'VuThanhSang',
            sub: userId,
            // iat: new Date().getTime(),
            // exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_REFRESH,
        {
            expiresIn: '1w',
        },
    );
};
const register = async (data) => {
    try {
        const newUser = await UserModel.signUp(data);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

const login = async (email, password) => {
    try {
        const result = await UserModel.login(email);
        const isCorrectPassword = await isValidPassword(password, result.password);
        if (!isCorrectPassword) return { message: 'incorrect password' };
        return result;
    } catch (error) {}
};
const isValidPassword = async (signInPassword, password) => {
    try {
        return await bcryptjs.compare(signInPassword, password);
    } catch (error) {
        throw new Error(error);
    }
};
const getAllUser = async () => {
    try {
        const result = await UserModel.getAllUser();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
export const UserService = { register, isValidPassword, encodedAccessToken, login, getAllUser, encodedRefreshToken };
