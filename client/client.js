const mongoose = require('mongoose');
const Heatmap = require('../schemas/heatmap');
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1000, 1000);

var heat = simpleheat(canvas);

mongoose.connect('mongodb://localhost/NEIUHeatMap', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

async function findAllDocuments() {
    let firstDate = new Date();
    const result = await Heatmap.find({}).select("-_id -lastUpdate -__v").sort({ x: 1, y: 1 }).lean();

    array = []
    for (key in result) {
        array.push([result[key].x, result[key].y, result[key].count]);
    }
    console.log(array);
    let secondDate = new Date();
    let timeDifference = Math.ceil((secondDate.getTime() - firstDate.getTime()));
    console.log("Updated Heatmap in " + timeDifference + "s");

    
}

result = findAllDocuments();
