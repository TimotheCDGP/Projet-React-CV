const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    education: [{
        degree: String,
        institution: String,
        year: String
    }],
    workExperience: [{
        jobTitle: String,
        company: String,
        duration: String,
        description: String
    }],
    visible: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Cv', cvSchema);