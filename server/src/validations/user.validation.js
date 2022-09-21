import Joi from 'joi';
import { HttpStatusCode } from '../utilities/constants';

const signIn = async (req, res, next) => {
    const condition = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(30).trim(),
    });
    try {
        await condition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message,
        });
    }
};

const signUp = async (req, res, next) => {
    const condition = Joi.object({
        firstName: Joi.string().max(50),
        lastName: Joi.string().max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(30).trim(),
    });
    try {
        await condition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message,
        });
    }
};

export const UserValidation = { signIn, signUp };
