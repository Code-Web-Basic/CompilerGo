import { db, Practice, Users } from '../config/dynamodb';
import { UserModel } from './user.model';
const createRandom = () => {
    var randomString = '';
    var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
    for (var i, i = 0; i < 28; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * 28));
    }
    return randomString;
};

const create = async (data = {}) => {
    const id = createRandom();
    data._id = id;
    const params = {
        TableName: Practice,
        Item: data,
    };

    try {
        await db.put(params).promise();
        // console.log(params);
        const data = await findOneById(id);
        return { success: true, data: data };
    } catch (error) {
        throw new Error(error);
    }
};

const getListPractice = async (userId) => {
    try {
        const practiceParams = {
            TableName: Practice,
        };
        const list = await db.scan(practiceParams).promise();
        const user = await UserModel.findOneById(userId);
        const result = list.Items.map((item) => {
            let isCompleted = false;
            user.practice?.forEach((element) => {
                // console.log(element.practiceId, item._id.toString());

                if (element === item._id.toString()) {
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
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const findOneById = async (value, key = '_id') => {
    const params = {
        TableName: Practice,
        Key: {
            [key]: value,
        },
    };
    try {
        const { Item = {} } = await db.get(params).promise();
        return Item;
    } catch (error) {
        throw new Error(error);
    }
};

// Delete User by ID
const deleteUserById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value),
        },
    };

    try {
        await db.delete(params).promise();
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

export const PracticeModel = { create, getListPractice, findOneById, deleteUserById };

// import Joi from 'joi';
// import { getDB } from '../config/mongodb';
// import { ObjectId } from 'mongodb';

// const practiceCollectionName = 'Practice';

// const practiceCollectionSchema = Joi.object({
//     task: Joi.string().required(),
//     example: Joi.object({ content: Joi.string().default(null), sample: Joi.array().default([]) }),
//     inputFormat: Joi.string().default(null),
//     constraints: Joi.string().default(null),
//     outputFormat: Joi.string().default(null),
//     sampleInput: Joi.array().default([]),
//     sampleOutput: Joi.array().default([]),
//     testCase: Joi.array().default([]),
//     title: Joi.string().required(),
//     difficult: Joi.string(),
// });
// const validateSchema = async (data) => {
//     return await practiceCollectionSchema.validateAsync(data, { abortEarly: false });
// };
// const findOneById = async (id) => {
//     try {
//         const result = await getDB()
//             .collection(practiceCollectionName)
//             .findOne({ _id: ObjectId(id) });
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const create = async (data) => {
//     try {
//         const value = await validateSchema(data);
//         const result = await getDB().collection(practiceCollectionName).insertOne(value);
//         const getAdded = await findOneById(result.insertedId.toString());
//         return getAdded;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const update = async (id, data) => {
//     try {
//         const result = await getDB()
//             .collection(practiceCollectionName)
//             .findOneAndUpdate({ _id: ObjectId(id) }, { $set: data });
//         const getUpdated = await findOneById(id);
//         return getUpdated;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const getListPractice = async (userId) => {
//     try {
//         const list = await getDB().collection(practiceCollectionName).find({}).toArray();
//         const user = await getDB()
//             .collection('Users')
//             .findOne({ _id: ObjectId(userId) });
//         const result = list.map((item) => {
//             let isCompleted = false;
//             user.practice?.forEach((element) => {
//                 // console.log(element.practiceId, item._id.toString());
//                 if (element.practiceId === item._id.toString()) {
//                     isCompleted = true;
//                 }
//             });
//             return {
//                 title: item.title,
//                 difficult: item.difficult,
//                 isCompleted: isCompleted,
//                 practiceId: item._id.toString(),
//             };
//         });
//         // console.log(list);
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// export const PracticeModel = { findOneById, validateSchema, create, update, getListPractice };
