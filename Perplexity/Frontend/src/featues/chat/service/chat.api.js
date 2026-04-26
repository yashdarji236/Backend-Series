import axios from 'axios';
import { store } from '../../../app.store';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});


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