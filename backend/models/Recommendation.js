const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    cvId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cv'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);