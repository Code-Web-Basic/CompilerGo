import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = false;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = true;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = true;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = false;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = true;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = true;
            state.register.error = true;
            state.register.success = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailed, registerStart, registerFailed, registerSuccess } =
    authSlice.actions;

export default authSlice.reducer;
