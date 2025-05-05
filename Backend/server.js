const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());



// Socket setup
require('./sockets/socketHandler')(io);

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/bids', require('./routes/bidRoutes'));

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
