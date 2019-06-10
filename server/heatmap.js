const Heatmap = require('../schemas/heatmap');
const mongoose = require('mongoose');
const User = require('../schemas/user');
const Coordinates = require('../schemas/coordinates');

mongoose.connect('mongodb://localhost/NEIUHeatMap', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

async function upsert(model, data, updatedData) {
    options = { upsert: true };
    const result = await model.findOneAndUpdate(data, { $set: updatedData }, options)
}

async function updateHeatMap() {

    let firstDate = new Date()
        

    try {
        const result = await Coordinates.aggregate([
            { "$group": { "_id": { x: "$x", y: "$y" }, "count": { "$sum": 1 } } }
        ])

        for (i = 0; i < result.length; i++) {
            try {
                await upsert(Heatmap, { x: result[i]._id.x, y: result[i]._id.y }, { count: result[i].count, lastUpdate: new Date });
            }
            catch (ex) {
                console.log(ex.message)
            }
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
    let secondDate = new Date();
    let timeDifference = Math.ceil((secondDate.getTime() - firstDate.getTime()));
    console.log("Updated Heatmap in "+ timeDifference +"s");
}

//while (true) {
setTimeout(function () { console.log("Hello"); }, 3000);
updateHeatMap();
//}