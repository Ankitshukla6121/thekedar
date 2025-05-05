const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.IO with proper CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200", // Your Angular frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  }
});

// ✅ CORS middleware for REST API
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

// ✅ Other middlewares
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB Connection Error:', error));


// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contractorRoutes = require('./routes/contractorRoutes');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', projectRoutes);
app.use('/contractor', contractorRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🌍 Backend is running!');
});

// ✅ Handle Socket.IO events
require('./sockets/socketHandler')(io);

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
