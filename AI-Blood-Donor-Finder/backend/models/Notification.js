// ===== NOTIFICATION MODEL =====
// BloodFinder AI - Notification Schema

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['email', 'sms', 'push', 'whatsapp'],
        default: 'push'
    },
    category: {
        type: String,
        enum: ['emergency', 'request', 'donation', 'system', 'reminder'],
        default: 'system'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    isSent: {
        type: Boolean,
        default: false
    },
    relatedRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodRequest'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for recipient and read status
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
