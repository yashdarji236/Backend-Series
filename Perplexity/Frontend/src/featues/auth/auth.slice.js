import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('authToken') || null,
        loading: true,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem('authToken', action.payload);
            } else {
                localStorage.removeItem('authToken');
            }
        },
        setLoading:(state , action) => {
            state.loading = action.payload
        },
        setError:(state , action) => {
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('authToken');
        }

}
})

export const {setUser , setToken, setLoading , setError, logout} = authSlice.actions
export default authSlice.reducer