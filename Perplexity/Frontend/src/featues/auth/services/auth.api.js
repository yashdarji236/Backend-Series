import axios from 'axios';
import { store } from '../../../app.store';
import { setToken } from '../auth.slice';

const api = axios.create({
    baseURL: 'https://perplexity-72qa.onrender.com',
    withCredentials: true,
})

// Add token to all auth requests
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export  const register = async ({ username, email, password }) => {
   try{
     const res =  await api.post('/api/auth/register', { username, email, password });
     // Store token if returned
     if (res.data?.data?.token) {
       store.dispatch(setToken(res.data.data.token));
     }
     return { success: true, data: res.data };
   }catch(err){
     console.error('Registration error:', err.response?.data);
     
     // Handle validation errors (422)
     if (err.response?.data?.errors) {
       const errorMsg = err.response.data.errors.map(e => e.message).join(', ');
       console.error('Validation errors:', err.response.data.errors);
       return { success: false, message: errorMsg };
     }
     
     // Handle specific error types
     const errorMessage = err.response?.data?.message || 'Registration failed';
     if (errorMessage.includes('invalid_grant')) {
       return { success: false, message: `❌ invalid_grant: ${errorMessage}` };
     }
     
     return { success: false, message: errorMessage };
   }
}

export  const login = async ({ email, password }) => {
     try{
      
        const res = await api.post('/api/auth/login', { email, password });
        // Store token from login response
        if (res.data?.data?.token) {
          store.dispatch(setToken(res.data.data.token));
        }
        return { success: true, data: res.data };
     }catch(err){
        console.error('Login error:', err.response?.data);
        const errorMsg = err.response?.data?.message || 'Invalid email or password';
        
        // Handle specific error types
        if (errorMsg.includes('invalid_grant')) {
          return { success: false, message: `❌ invalid_grant: ${errorMsg}` };
        }
        
        return { success: false, message: errorMsg };
     }
}


export  const Getme = async () => {
    try{
         const res = await api.get('/api/auth/get-me');
            return { success: true, data: res.data };
    }catch(err){
        return { success: false, message: err.response?.data?.message || 'Failed to fetch user' };
    }
}