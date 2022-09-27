import Joi from 'joi';
import { getDB } from '../config/mongodb';
import { ObjectId } from 'mongodb';
import { cloneDeep } from 'lodash';

const compiledCollectionName = 'Compiled';

const compiledCollectionSchema = Joi.object({
    fileName: Joi.string().required(),
    code: Joi.string(),
});

export const CompileModel = {};
