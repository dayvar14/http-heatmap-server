require('dotenv').config();
const mongoose = require('mongoose');

const CoordinatesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    x: { type: Number, min: process.env.HEATMAP_MIN_X, max: process.env.HEATMAP_MAX_X },
    y: { type: Number, min: process.env.HEATMAP_MIN_Y, max: process.env.HEATMAP_MAX_Y },
    lastUpdate: {
        type: Date,
        default: Date.now,
        expires: process.env.COORDINATE_EXPIRE_TIME,
    }
});

CoordinatesSchema.index({ username:1 }, { "unique": true });
module.exports = mongoose.model("coordinates", CoordinatesSchema);