const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection",(socket)=>{
    console.log('user connected: ',socket.id);

    //handle chat events
    socket.on('chat message',(msg)=>{
        //Broadcast the message to all connected clients
        io.emit('chat message : ',msg)
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});