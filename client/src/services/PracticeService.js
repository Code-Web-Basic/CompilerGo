import * as httpRequest from '~/utils/httpRequest';
import PropTypes from 'prop-types';
export const getPracticeUser = async (userId) => {
    try {
        const response = await httpRequest.get(`/practice/getList/${userId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

getPracticeUser.Prototypes = {
    userId: PropTypes.string,
};

export const getPracticeId = async (id) => {
    try {
        const response = await httpRequest.get(`/practice/findOneById/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

getPracticeId.Prototypes = {
    id: PropTypes.string,
};

export const submitCodeUser = async (language, code, userId, practiceId) => {
    try {
        const response = await httpRequest.post(`/v1/users/submitCode`, {
            language,
            code,
            userId,
            practiceId,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

submitCodeUser.Prototypes = {
    language: PropTypes.string,
    code: PropTypes.string,
    userId: PropTypes.string,
    practiceId: PropTypes.string,
};
