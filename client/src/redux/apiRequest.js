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
        const res = await httpRequest.post('users/signUp', user);
        dispatch(loginSuccess(res.data));
        navigate(ConfigRouter.Home);
    } catch (error) {}
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await httpRequest.post('users/signIn', user);
        dispatch(registerSuccess());
        navigate(ConfigRouter.login);
    } catch {
        dispatch(registerFailed());
    }
};
export const loginGoogleUser = async (dispatch) => {
    dispatch(loginStart());
    try {
        const fetchDataUser = async () => {
            const request = await httpRequest.get('users/signIn/success');
            return request;
        };
        fetchDataUser().then((data) => {
            dispatch(loginSuccess(data));
        });
    } catch {
        dispatch(registerFailed());
    }
};
export const logOutUser = async (id, dispatch, navigate, accessToken) => {
    dispatch(logOutStart());
    try {
        await httpRequest.get('users/signOut', id, {
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
