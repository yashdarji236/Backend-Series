const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);  // wrap express with http
const io = new Server(server);          // attach socket.io to server

io.on('connection', (socket) => {
  console.log('A user connected! ID:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});