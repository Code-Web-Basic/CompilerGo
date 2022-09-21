import axios from 'axios';
import queryString from 'query-string';

import PropTypes from 'prop-types';
const httpRequest = axios.default.create({
    baseURL: '',

    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    paramsSerializer: (params) => queryString.stringify({ ...params }),
});
httpRequest.interceptors.request.use(async (config) => config);

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response.data;
};
get.prototypes = {
    path: PropTypes.string,
    option: PropTypes.object,
};
post.prototypes = {
    path: PropTypes.string,
    option: PropTypes.object,
};
export default httpRequest;
