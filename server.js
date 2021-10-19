const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    },
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on('connection', (socket) => {
    socket.on('send-vote', counts => {
        socket.broadcast.emit('receive-vote', counts);
    })
})

http.listen(3000, (error) => {
    if (error) {
        console.log("Error: " + error.toString());
    }
    else {
        console.log("Server started at http://localhost:3000");
    }
});