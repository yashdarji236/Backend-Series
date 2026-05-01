import {Server, Socket} from 'socket.io'

let io;
export function initSocket(httpServer){
    io = new Server(httpServer,{
        cors: {
            origin: ['https://backend-series-seven.vercel.app'],
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