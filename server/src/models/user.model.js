import { db, Users, Practice } from '../config/dynamodb';
import { cloneDeep } from 'lodash';
import bcryptjs from 'bcryptjs';
const createRandom = () => {
    var randomString = '';
    var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
    for (var i, i = 0; i < 28; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * 28));
    }
    return randomString;
};
// Create or Update users
const signUp = async (data = {}) => {
    const id = createRandom();
    data._id = id;
    const insertData = await encodePassword(data);
    const check = {
        TableName: Users,
        FilterExpression: 'email = :e AND authType = :a',
        ExpressionAttributeValues: {
            ':e': data.email,
            ':a': 'local',
        },
    };
    const result = await db.scan(check).promise();
    const params = {
        TableName: Users,
        Item: insertData,
    };

    try {
        if (result.Count === 0) {
            await db.put(params).promise();
            const data = await findOneById(id);
            return { success: true, data: data };
        }
        return { success: false, data: 'Đã tồn tại email này' };
    } catch (error) {
        return { success: false, data: error };
    }
};

const login = async (email) => {
    try {
        const params = {
            TableName: Users,
            FilterExpression: 'email = :e AND authType = :a',
            ExpressionAttributeValues: {
                ':e': email,
                ':a': 'local',
            },
        };
        const result = await db.scan(params).promise();
        return result.Items[0];
    } catch (error) {
        console.log(error);
    }
};
// Read all users
const getAllUser = async () => {
    const params = {
        TableName: Users,
    };

    try {
        const { Items = [] } = await db.scan(params).promise();
        return Items;
    } catch (error) {
        throw new Error(error);
    }
};

// Read Users by ID
const findOneById = async (value, key = '_id') => {
    const params = {
        TableName: Users,
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

const submitCode = async (data, result) => {
    try {
        const user = await findOneById(data.userId);
        let isCompleted = true;
        result.forEach((element) => {
            if (element.success === false) {
                isCompleted = false;
            }
        });
        const temp = data;
        if (isCompleted === true) {
            if (user?.practice?.filter((e) => e === data.practiceId).length === 0 || !user.practice) {
                if (!user.practice) {
                    user.practice = [];
                }
                user.practice.push(temp.practiceId);
                const params = {
                    TableName: Users,
                    Item: user,
                };
                await db.put(params).promise();
            }
            // console.log(user);
        }
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const UserModel = {
    signUp,
    login,
    getAllUser,
    findOneById,
    submitCode,
};

// import Joi from 'joi';
// import { getDB } from '../config/mongodb';
// import { ObjectId } from 'mongodb';

// const userCollectionName = 'Users';

// const userCollectionSchema = Joi.object({
//     firstName: Joi.string().max(50).default(null),
//     lastName: Joi.string().max(50).default(null),
//     password: Joi.string().min(5).max(30).trim().default(null),
//     createdAt: Joi.date().timestamp().default(Date.now()),
//     updatedAt: Joi.date().timestamp().default(null),
//     email: Joi.string().required().email(),
//     authGoogleId: Joi.string().default(null),
//     authGithubId: Joi.string().default(null),
//     authType: Joi.string().valid('local', 'google', 'github').default('local'),
//     practice: Joi.array().default([]),
// });
// const validateSchema = async (data) => {
//     return await userCollectionSchema.validateAsync(data, { abortEarly: false });
// };
// const findOneById = async (id) => {
//     try {
//         const result = await getDB()
//             .collection(userCollectionName)
//             .findOne({ _id: ObjectId(id) });
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// const lookupEmail = async (email) => {
//     const valid = await getDB().collection(userCollectionName).findOne({ email: email });
//     if (valid) {
//         throw new Error('email is already exist');
//     }
// };
// const login = async (email) => {
//     try {
//         const result = await getDB().collection(userCollectionName).findOne({ email: email, authType: 'local' });
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// const signUp = async (data) => {
//     try {
//         // validate data
//         //check email exist
//         const validatedValue = await validateSchema(data);
//         let insertValue = cloneDeep(validatedValue);
//         if (validatedValue.authType === 'local') {
//             const schema = Joi.string().external(lookupEmail);
//             await schema.validateAsync(data.email);
//             //encode password
//             insertValue = await encodePassword(validatedValue);
//         }

//         //add data to database
//         const result = await getDB().collection(userCollectionName).insertOne(insertValue);
//         //find and return added data
//         const GetNewUser = await findOneById(result.insertedId.toString());
//         return GetNewUser;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const getAllUser = async () => {
//     const result = await getDB().collection(userCollectionName).find({}).toArray();
//     return result;
// };
// const submitCode = async (data, result) => {
//     try {
//         const user = await findOneById(data.userId);
//         let isCompleted = true;
//         result.forEach((element) => {
//             if (element.success === false) {
//                 isCompleted = false;
//             }
//         });
//         if (isCompleted === true) {
//             if (
//                 user.practice?.filter((e) => e.practiceId === data.practiceId && e.language === data.language).length ==
//                     0 ||
//                 !user.practice
//             ) {
//                 await getDB()
//                     .collection(userCollectionName)
//                     .findOneAndUpdate(
//                         { _id: ObjectId(data.userId) },
//                         { $push: { practice: { practiceId: data.practiceId, language: data.language } } },
//                     );
//             }
//             // console.log(user);
//         }
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };
// export const UserModel = { signUp, findOneById, validateSchema, login, getAllUser, submitCode };
