import {configureStore} from '@reduxjs/toolkit';
import authReducer from './featues/auth/auth.slice'


export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})