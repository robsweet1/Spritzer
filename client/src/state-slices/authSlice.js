import { createSlice } from '@reduxjs/toolkit'

const initialState = {isLoggedIn: false}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAuth: (state, action) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const { changeAuth } = authSlice.actions
export default authSlice.reducer

export const selectAuth = state => state.auth.isLoggedIn