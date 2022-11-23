import Joi from 'joi';
import { getDB } from '../config/mongodb';
import { ObjectId } from 'mongodb';

const practiceCollectionName = 'Practice';

const practiceCollectionSchema = Joi.object({
    task: Joi.string().required(),
    example: Joi.object({ content: Joi.string().default(null), sample: Joi.array().default([]) }),
    inputFormat: Joi.string().default(null),
    constraints: Joi.string().default(null),
    outputFormat: Joi.string().default(null),
    sampleInput: Joi.array().default([]),
    sampleOutput: Joi.array().default([]),
    testCase: Joi.array().default([]),
    title: Joi.string().required(),
    difficult: Joi.string(),
});
const validateSchema = async (data) => {
    return await practiceCollectionSchema.validateAsync(data, { abortEarly: false });
};
const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(practiceCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const create = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(practiceCollectionName).insertOne(value);
        const getAdded = await findOneById(result.insertedId.toString());
        return getAdded;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const result = await getDB()
            .collection(practiceCollectionName)
            .findOneAndUpdate({ _id: ObjectId(id) }, { $set: data });
        const getUpdated = await findOneById(id);
        return getUpdated;
    } catch (error) {
        throw new Error(error);
    }
};

const getListPractice = async (userId) => {
    try {
        const list = await getDB().collection(practiceCollectionName).find({}).toArray();
        const user = await getDB()
            .collection('Users')
            .findOne({ _id: ObjectId(userId) });
        const result = list.map((item) => {
            let isCompleted = false;
            user.practice?.forEach((element) => {
                // console.log(element.practiceId, item._id.toString());
                if (element.practiceId === item._id.toString()) {
                    isCompleted = true;
                }
            });
            return {
                title: item.title,
                difficult: item.difficult,
                isCompleted: isCompleted,
                practiceId: item._id.toString(),
            };
        });
        // console.log(list);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const PracticeModel = { findOneById, validateSchema, create, update, getListPractice };
