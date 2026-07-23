// ===== DONATION MODEL =====
// BloodFinder AI - Donation Schema

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodRequest'
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    units: {
        type: Number,
        required: true,
        min: 1
    },
    donationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['completed', 'cancelled', 'pending'],
        default: 'completed'
    },
    notes: {
        type: String,
        trim: true
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
