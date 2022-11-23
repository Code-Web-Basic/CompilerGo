import Joi from 'joi';
import { getDB } from '../config/mongodb';
import { ObjectId } from 'mongodb';
import { cloneDeep } from 'lodash';
import bcryptjs from 'bcryptjs';
const userCollectionName = 'Users';

const userCollectionSchema = Joi.object({
    firstName: Joi.string().max(50).default(null),
    lastName: Joi.string().max(50).default(null),
    password: Joi.string().min(5).max(30).trim().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    email: Joi.string().required().email(),
    authGoogleId: Joi.string().default(null),
    authGithubId: Joi.string().default(null),
    authType: Joi.string().valid('local', 'google', 'github').default('local'),
    practice: Joi.array().default([]),
});
const validateSchema = async (data) => {
    return await userCollectionSchema.validateAsync(data, { abortEarly: false });
};
const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(userCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const lookupEmail = async (email) => {
    const valid = await getDB().collection(userCollectionName).findOne({ email: email });
    if (valid) {
        throw new Error('email is already exist');
    }
};
const login = async (email) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne({ email: email, authType: 'local' });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const signUp = async (data) => {
    try {
        // validate data
        //check email exist
        const validatedValue = await validateSchema(data);
        let insertValue = cloneDeep(validatedValue);
        if (validatedValue.authType === 'local') {
            const schema = Joi.string().external(lookupEmail);
            await schema.validateAsync(data.email);
            //encode password
            insertValue = await encodePassword(validatedValue);
        }

        //add data to database
        const result = await getDB().collection(userCollectionName).insertOne(insertValue);
        //find and return added data
        const GetNewUser = await findOneById(result.insertedId.toString());
        return GetNewUser;
    } catch (error) {
        throw new Error(error);
    }
};
const encodePassword = async (data) => {
    try {
        //generate a salt
        const tempData = cloneDeep(data);
        const salt = await bcryptjs.genSalt(10);
        const passwordHashed = await bcryptjs.hash(tempData.password, salt);
        tempData.password = passwordHashed;
        return tempData;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllUser = async () => {
    const result = await getDB().collection(userCollectionName).find({}).toArray();
    return result;
};
const submitCode = async (data, result, status) => {
    try {
        const user = await findOneById(data.userId);
        if (status === true) {
            if (user.practice.filter((e) => e.practiceId === data.practiceId).length > 0) {
                return { output: 'Dã hoàn thành task này' };
            } else {
                await getDB()
                    .collection(userCollectionName)
                    .findOneAndUpdate(
                        { _id: ObjectId(data.userId) },
                        { $push: { practice: { practiceId: data.practiceId, language: data.language } } },
                    );
                return result;
            }
            // console.log(user);
        } else {
            return { error: 'Wrong' };
        }
    } catch (error) {
        throw new Error(error);
    }
};
export const UserModel = { signUp, findOneById, validateSchema, login, getAllUser, submitCode };
