import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

export  const register = async ({ username, email, password }) => {
   try{
     const res =  await api.post('/api/auth/register', { username, email, password });
     return { success: true, data: res.data };
   }catch(err){
     // Handle validation errors (422)
     if (err.response?.data?.errors) {
       const errorMsg = err.response.data.errors.map(e => e.message).join(', ');
       console.error('Validation errors:', err.response.data.errors);
       return { success: false, message: errorMsg };
     }
     return { success: false, message: err.response?.data?.message || 'Registration failed' };
   }
}

export  const login = async ({ email, password }) => {
     try{
        const res = await api.post('/api/auth/login', { email, password });
        return { success: true, data: res.data };
     }catch(err){
        return { success: false, message: err.response?.data?.message || 'Login failed' };
     }
}


export  const Getme = async () => {
    try{
         const res = await api.get('/api/auth/me');
            return { success: true, data: res.data };
    }catch(err){
        return { success: false, message: err.response?.data?.message || 'Failed to fetch user' };
    }
}