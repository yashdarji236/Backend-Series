import { io } from "socket.io-client";

let socket = null;

export const initSocketConnection = () => {
    if (socket) return socket;
    
    socket = io('http://localhost:3000', {
        withCredentials: true,
    });

    socket.on('connect', () => {
        console.log('Connected to server with socket ID:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    return socket;
};

export const sendMessage = (message, chatId) => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            initSocketConnection();
        }

        socket.emit('send_message', { message, chatId }, (response) => {
            if (response.status === 'success') {
                resolve(response);
            } else {
                reject(response.error);
            }
        });

        // Timeout if no response
        setTimeout(() => {
            reject(new Error('Message sending timeout'));
        }, 30000);
    });
};

export const getSocket = () => socket;