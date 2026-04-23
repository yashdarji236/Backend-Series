import app from './src/app.js'
import {testAi} from './src/services/ai.service.js'
import http from 'http'
import { initSocket } from './src/sockets/socket.service.js'
testAi()
const server = http.createServer(app)
initSocket(server)
server.listen(3000,()=>{
    console.log("Server is Running");
    
})