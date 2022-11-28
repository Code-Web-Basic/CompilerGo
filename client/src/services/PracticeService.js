import * as httpRequest from '~/utils/httpRequest';
import PropTypes from 'prop-types';
import axios from 'axios';
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

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const submitCodeUser = async (language, code, userId, practiceId) => {
    try {
        const response = await httpRequest.post(`/users/submitCode`, {
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

// submitCodeUser.Prototypes = {
//     language: PropTypes.string,
//     code: PropTypes.string,
//     userId: PropTypes.string,
//     practiceId: PropTypes.string,
// };
