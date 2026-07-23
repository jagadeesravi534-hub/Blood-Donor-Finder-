// ===== BACKEND SERVER =====
// BloodFinder AI - Main Server Entry Point

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// ===== MIDDLEWARE =====
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ===== DATABASE CONNECTION =====
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodfinder', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB();

// ===== ROUTES =====
app.get('/', (req, res) => {
    res.json({
        message: 'BloodFinder AI API',
        version: '1.0.0',
        status: 'running'
    });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donors', require('./routes/donorRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/maps', require('./routes/mapRoutes'));
app.use('/api/voice', require('./routes/voiceRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// AI Routes
app.use('/api/ai', require('./routes/aiRoutes'));

// ===== SOCKET.IO =====
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room for specific user
    socket.on('join', (userId) => {
        socket.join(userId);
    });

    // Handle emergency alerts
    socket.on('emergency-alert', (data) => {
        // Broadcast to nearby donors
        socket.broadcast.emit('emergency-alert', data);
    });

    // Handle donor responses
    socket.on('donor-response', (data) => {
        // Send to requester
        socket.to(data.requesterId).emit('donor-response', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

// ===== 404 HANDLER =====
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`BloodFinder AI Server running on port ${PORT}`);
});

module.exports = app;
