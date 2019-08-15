require('dotenv').config();
const mongoose = require('mongoose');

const HeatmapSchema = new mongoose.Schema({
    x: { type: Number, min: process.env.HEATMAP_MIN_X, max: process.env.HEATMAP_MAX_X },
    y: { type: Number, min: process.env.HEATMAP_MIN_Y, max: process.env.HEATMAP_MAX_Y },
    count: {
        type: Number
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
        expires: process.env.HEATMAP_EXPIRE_TIME
    }
});

HeatmapSchema.index({ x:1, y:1 }, { "unique": true });
module.exports = mongoose.model("heatmaps", HeatmapSchema);