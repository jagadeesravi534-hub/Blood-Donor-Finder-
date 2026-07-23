// ===== BLOOD REQUEST MODEL =====
// BloodFinder AI - Blood Request Schema

const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patientName: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true
    },
    patientAge: {
        type: Number,
        required: [true, 'Patient age is required']
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: [true, 'Blood group is required']
    },
    unitsRequired: {
        type: Number,
        required: [true, 'Units required is required'],
        min: [1, 'At least 1 unit is required'],
        max: [10, 'Maximum 10 units allowed']
    },
    hospital: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        }
    },
    urgency: {
        type: String,
        enum: ['normal', 'urgent', 'emergency'],
        default: 'normal'
    },
    requiredBy: {
        type: Date
    },
    medicalReason: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled', 'rejected'],
        default: 'pending'
    },
    isEmergency: {
        type: Boolean,
        default: false
    },
    isFake: {
        type: Boolean,
        default: false
    },
    aiScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    matchedDonors: [{
        donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
        respondedAt: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for geospatial queries
bloodRequestSchema.index({ 'hospital.location': '2dsphere' });

// Index for status and urgency
bloodRequestSchema.index({ status: 1, urgency: 1 });

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
