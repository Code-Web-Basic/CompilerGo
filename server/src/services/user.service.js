import { UserModel } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { any } from 'joi';
import { csCompileService } from '../services/csCompile.service';
import { cppCompileService } from '../services/cppCompile.service';
import { JavaCompileService } from '../services/javaCompile.service';
import { pythonCompileService } from '../services/pythonCompile.service';
import { PracticeModel } from '../models/practice.model';
import Async from 'async';
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
const submitCode = async (data, fn) => {
    try {
        var envData = { OS: 'windows' };
        const input = await PracticeModel.findOneById(data.practiceId);
        switch (data.language) {
            case 'python':
                pythonCompileService.compilePythonWithInput(
                    envData,
                    data.code,
                    input.testCase[0].input,
                    async (result) => {
                        if (result.error) {
                            fn(result.error);
                        } else {
                            const temp = result.output.replace(/(\r\n|\n|\r)/gm, ',').slice(0, -1);
                            const output = await UserModel.submitCode(
                                data,
                                result,
                                input.testCase[0].output.toString() === temp,
                            );
                            fn(output);
                        }
                    },
                );
                break;
            case 'cs':
                await csCompileService.compileCSWithInput(
                    envData,
                    data.code,
                    input.testCase[0].input,
                    async (result) => {
                        if (result.error) {
                            fn(result.error);
                        } else {
                            const temp = result.output.replace(/(\r\n|\n|\r)/gm, ',').slice(0, -1);
                            const output = await UserModel.submitCode(
                                data,
                                result,
                                input.testCase[0].output.toString() === temp,
                            );
                            fn(output);
                        }
                    },
                );
                break;
            case 'cpp':
                await cppCompileService.compileCPPWithInput(
                    envData,
                    data.code,
                    input.testCase[0].input,
                    async (result) => {
                        if (result.error) {
                            fn(result.error);
                        } else {
                            const temp = result.output.replace(/(\r\n|\n|\r)/gm, ',').slice(0, -1);
                            const output = await UserModel.submitCode(
                                data,
                                result,
                                input.testCase[0].output.toString() === temp,
                            );
                            fn(output);
                        }
                    },
                );
                break;
            case 'java':
                await JavaCompileService.compileJavaWithInput(
                    envData,
                    data.code,
                    input.testCase[0].input,
                    async (result) => {
                        if (result.error) {
                            fn(result.error);
                        } else {
                            const temp = result.output.replace(/(\r\n|\n|\r)/gm, ',').slice(0, -1);
                            const output = await UserModel.submitCode(
                                data,
                                result,
                                input.testCase[0].output.toString() === temp,
                            );
                            fn(output);
                        }
                    },
                );
                break;
            default:
                break;
        }
    } catch (error) {}
};
export const UserService = {
    register,
    isValidPassword,
    encodedAccessToken,
    login,
    getAllUser,
    encodedRefreshToken,
    submitCode,
};
