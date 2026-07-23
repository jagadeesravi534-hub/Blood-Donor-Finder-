// ===== FEEDBACK MODEL =====
// BloodFinder AI - Feedback Schema

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['donation', 'request', 'platform', 'support', 'other'],
        default: 'other'
    },
    relatedRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodRequest'
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
