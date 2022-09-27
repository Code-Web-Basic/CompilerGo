import { ConfigRouter } from '~/config';
import * as httpRequest from '~/utils/httpRequest';
import { loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await httpRequest.post('/Login', user);
        dispatch(loginSuccess(res.data));
        navigate(ConfigRouter.Home);
    } catch (error) {}
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await httpRequest.post('/register', user);
        dispatch(registerSuccess());
        navigate(ConfigRouter.login);
    } catch {
        dispatch(registerFailed());
    }
};
