import { FaIgloo } from 'react-icons/fa';
import { ConfigRouter } from '~/config';
import * as httpRequest from '~/utils/httpRequest';
import {
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await httpRequest.post('users/login', user);
        console.log(res);
        dispatch(loginSuccess(res));
        navigate(ConfigRouter.Home);
    } catch (error) {
        dispatch(logOutFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await httpRequest.post('users/register', user);
        dispatch(registerSuccess());
        navigate(ConfigRouter.login);
    } catch {
        dispatch(registerFailed());
    }
};
export const loginGoogleUser = async (dispatch) => {
    dispatch(loginStart());
    try {
        console.log('a');
        const fetchDataUser = async () => {
            const request = await httpRequest.get('users/signIn/success');
            return request;
        };
        fetchDataUser().then((data) => {
            if (data?.success !== false) {
                dispatch(loginSuccess(data));
            }
        });
    } catch {
        dispatch(registerFailed());
    }
};
export const logOutUser = async (id, dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        console.log(accessToken);
        await axiosJWT.post(`${process.env.REACT_APP_BASE_URL}/users/logout`, id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logOutSuccess());
        navigate(ConfigRouter.home);
    } catch {
        dispatch(logOutFailed());
    }
};
