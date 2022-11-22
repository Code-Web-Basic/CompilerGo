import { PracticeService } from '../services/practiec.service';
import { HttpStatusCode } from '../utilities/constants';

const create = async (req, res) => {
    try {
        const result = await PracticeService.create(req.body);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};

const update = async (req, res) => {
    try {
        const result = await PracticeService.update(req.params, req.body);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const getList = async (req, res) => {
    try {
        const result = await PracticeService.getListPractice(req.params);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
const findOneById = async (req, res) => {
    try {
        const result = await PracticeService.findOneById(req.params);
        res.status(HttpStatusCode.OK).json({ data: result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: new Error(error).message,
        });
    }
};
export const PracticeController = { create, update, getList, findOneById };
