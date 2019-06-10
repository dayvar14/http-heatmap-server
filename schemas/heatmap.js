const mongoose = require('mongoose');

const HeatmapSchema = new mongoose.Schema({
    x: { type: Number, min: 0, max: 99 },
    y: { type: Number, min: 0, max: 99 },
    count: {
        type: Number
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
        expires: '5m'
    }
});

HeatmapSchema.index({ x:1, y:1 }, { "unique": true });
module.exports = mongoose.model("heatmaps", HeatmapSchema);