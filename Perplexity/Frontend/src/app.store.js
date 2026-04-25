import {configureStore} from '@reduxjs/toolkit';
import authReducer from './featues/auth/auth.slice'
import chatReducer from './featues/chat/store/chatSlice'


export const store = configureStore({
    reducer:{
        auth:authReducer,
        chat:chatReducer
    }
})