import { Server } from 'socket.io'

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {  // ✅ assign to outer 'io', use 'httpServer'
        cors: {
            origin: [
                'https://backend-series-git-main-yashdarji5237-1754s-projects.vercel.app',
                'http://localhost:5173', // ✅ for local development
            ],
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingTimeout: 60000,     // ✅ Render fix
        pingInterval: 25000,    // ✅ keep alive
        upgradeTimeout: 30000,  // ✅ ws upgrade time
        allowUpgrades: true,
        transports: ['polling', 'websocket'],
    });

    console.log('Socket.io initialized');

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('disconnect', (reason) => {
            console.log('User disconnected:', socket.id, '| Reason:', reason);
        });
    });

    return io; // ✅ good practice to return it too
}

export function getIO() {
    if (!io) {
        throw new Error('Socket.io not initialized. Call initSocket first.')
    }
    return io;
}