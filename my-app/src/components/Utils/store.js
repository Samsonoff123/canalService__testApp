import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../Utils/auth'
import { postsReducer } from '../Utils/posts'


const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    }
})

export default store