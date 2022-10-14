import { UserModel } from '../models/User.model';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { any } from 'joi';

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

export const UserService = { register, isValidPassword, encodedToken, login };
