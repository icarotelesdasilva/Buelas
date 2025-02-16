const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve arquivos estáticos (HTML, JS, CSS)
app.use(express.static('public'));

// Evento de conexão de novo usuário
io.on('connection', socket => {
  console.log('Novo usuário conectado');

  // Receber sinal de oferecimento de chamada de vídeo (offer)
  socket.on('video-offer', (offer, room) => {
    socket.to(room).emit('video-offer', offer);
  });

  // Receber sinal de resposta de chamada (answer)
  socket.on('video-answer', (answer, room) => {
    socket.to(room).emit('video-answer', answer);
  });

  // Receber sinal de ICE candidate
  socket.on('new-ice-candidate', (candidate, room) => {
    socket.to(room).emit('new-ice-candidate', candidate);
  });

  // Criar ou entrar em uma sala
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`Usuário entrou na sala ${room}`);
  });

  // Evento de desconexão
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Inicia o servidor na porta 3000
server.listen(6000, () => {
  console.log('Servidor rodando na porta 6000');
});
