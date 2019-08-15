require('dotenv').config();
const mongoose = require('mongoose');

const HeatmapSchema = new mongoose.Schema({
    x: { type: Number, min: 0, max: 1000 },
    y: { type: Number, min: 0, max: 1000 },
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