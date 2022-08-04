import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuthMe.pending] : (state)=>{
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthMe.fulfilled] : (state, action)=>{
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchAuthMe.rejected] : (state)=>{
            state.data = null;
            state.status = 'error';
        },

    }
})

export const authReducer = authSlice.reducer