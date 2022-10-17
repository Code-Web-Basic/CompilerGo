import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isFetching = true;
        },
    },
});
