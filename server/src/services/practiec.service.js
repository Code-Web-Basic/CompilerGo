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

const getListPractice = async (data) => {
    try {
        const list = await PracticeModel.getListPractice(data);
        return list;
    } catch (error) {
        throw new Error(error);
    }
};

const findOneById = async (id) => {
    try {
        const data = await PracticeModel.findOneById(id);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};
export const PracticeService = { create, update, getListPractice, findOneById };
