import axios from 'axios';

const api = axios.create({
    baseURL: 'https://perplexity-72qa.onrender.com',
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
        console.error('Login error:', err.response?.data);
        const errorMsg = err.response?.data?.message || 'Invalid email or password';
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