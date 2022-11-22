import { PracticeModel } from '../models/practice.model';

const create = async (data) => {
    try {
        const result = await PracticeModel.create(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (data) => {
    try {
        const result = await PracticeModel.update(id, data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const PracticeService = { create, update };
