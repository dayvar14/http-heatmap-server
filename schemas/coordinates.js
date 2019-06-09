const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
        min: 0,
        max: 99,
        unique: true
    },
    y: {
        type: Number,
        required: true,
        min: 0,
        max: 99,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model("coordinates", CoordinateSchema);