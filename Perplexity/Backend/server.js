import app from './src/app.js'
import http from 'http'
import { initSocket } from './src/sockets/socket.service.js'
const server = http.createServer(app)
initSocket(server)
server.listen(3000,()=>{
    console.log("Server is Running");
    
})