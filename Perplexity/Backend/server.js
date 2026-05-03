import app from './src/app.js'
import http from 'http'
import { initSocket } from './src/sockets/socket.service.js'
import { Server } from "socket.io";
import { GenerateResponce } from "./src/services/ai.service.js";

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [
      "https://backend-series-git-main-yashdarji5237-1754s-projects.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    methods: ["GET", "POST"],
    credentials: true
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


server.listen(3000, () => {
  console.log("Server is Running");

})