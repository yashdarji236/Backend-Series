import app from './src/app.js'
import http from 'http'
import { initSocket } from './src/sockets/socket.service.js'
import { Server } from "socket.io";
import { GenerateResponce } from "./src/services/ai.service.js";
const server = http.createServer(app)
initSocket(server)
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async (messages) => {
    try {
      await GenerateResponce(messages, socket); // 👈 pass socket
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


server.listen(3000,()=>{
    console.log("Server is Running");
    
})