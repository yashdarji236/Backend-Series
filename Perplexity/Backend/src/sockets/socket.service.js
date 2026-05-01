import {Server, Socket} from 'socket.io'

let io;
export function initSocket(httpServer){
    io = new Server(httpServer,{
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:5174'],
            credentials: true
        }
    })
    console.log('Socket.io initialized');
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

    });
}

export function getIO(){
    if(!io){
        throw new Error('Socket.io not initialized. Call initSocket first.')
    }
    return io;
}