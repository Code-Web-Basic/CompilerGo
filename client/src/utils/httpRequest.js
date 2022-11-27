import axios from 'axios';
import queryString from 'query-string';

import PropTypes from 'prop-types';
// console.log(process.env.REACT_APP_BASE_URL);
const httpRequest = axios.default.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // withCredentials: true,
    withCredentials: true,
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
