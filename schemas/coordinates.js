const mongoose = require('mongoose');

const CoordinatesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    x: { type: Number, min: 0, max: 99 },
    y: { type: Number, min: 0, max: 99 },
    lastUpdate: {
        type: Date,
        default: Date.now,
        expires: '5m',
    }
});

CoordinatesSchema.index({ username:1 }, { "unique": true });
module.exports = mongoose.model("coordinates", CoordinatesSchema);