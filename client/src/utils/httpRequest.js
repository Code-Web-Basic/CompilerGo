import axios from 'axios';
import queryString from 'query-string';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// console.log(process.env.REACT_APP_BASE_URL);
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // timeout: 1000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    // paramsSerializer: (params) => queryString.stringify({ ...params }),
});
httpRequest.interceptors.request.use(async (config) => {
    // const token = useSelector((state) => state.auth.login.currentUser.accessToken);
    // config.headers.Authorization = token ? `Bearer ${token}` : '';
    // config.cancelToken;
    return config;
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const post = async (path, options = {}) => {
    console.log('text');
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
