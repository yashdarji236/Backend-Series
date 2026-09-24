import axios from 'axios';
import { store } from '../../../app.store';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:3000';
  }
  return 'https://perplexity-72qa.onrender.com';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Add token to all chat API requests
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

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized: Token may be expired or invalid');
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);


export const sendMessage = async (message, chatId) => {
    try {
        const response = await api.post(`/api/chats/message`, { message, chat: chatId });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getChat = async (chatId) => {
    try {
        const response = await api.get(`/api/chats/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw error;
    }
};
export const getMessages = async (chatId) => {
    try {
        const response = await api.get(`/api/chats/${chatId}/messages`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};


export const deleteChat = async (chatId) => {
    try {
        const response = await api.delete(`/api/chats/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
};