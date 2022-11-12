import axios from 'axios';
import * as httpRequest from '~/utils/httpRequest';
import jwtDecode from 'jwt-decode';
const refreshToken = async () => {
    try {
        const res = await httpRequest.post('users/refresh', {
            withCredentials: true,
        });
        console.log('3 ', res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            console.log('1 ', user);
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                console.log('2 ', data);
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            console.log('asc');
            return Promise.reject(err);
        },
    );
    return newInstance;
};
