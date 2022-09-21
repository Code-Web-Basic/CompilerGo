import Joi from 'joi';
import { getDB } from '../config/mongodb';
import { ObjectId } from 'mongodb';
import { cloneDeep } from 'lodash';
import bcryptjs from 'bcryptjs';
const userCollectionName = 'Users';

const userCollectionSchema = Joi.object({
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
    password: Joi.string().required().min(5).max(30).trim(),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    email: Joi.string().required().email(),
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
const signUp = async (data) => {
    try {
        //check email exist
        const schema = Joi.string().external(lookupEmail);
        await schema.validateAsync(data.email);

        // validate data
        const validatedValue = await validateSchema(data);
        let insertValue = cloneDeep(validatedValue);
        //encode password
        insertValue = await encodePassword(insertValue);
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
export const UserModel = { signUp, findOneById };
