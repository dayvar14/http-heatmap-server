const Heatmap = require('../schemas/heatmap');
const mongoose = require('mongoose');
const Coordinates = require('../schemas/coordinates');

//Connects to HeatMap Database
mongoose.connect('mongodb://localhost/NEIUHeatMap', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// delay between heatmap updates
let delayBetweenUpdates = 10000;

//This function finds if a document contains the same key and then updates it with new data. If a document is not found,
//a new one is created
async function upsert(model, key, data) {
    options = { upsert: true };
    const result = await model.findOneAndUpdate(key, { $set: data }, options)
}

//Updates Heatmap with coordinates from the Coordinates Table
//If 
async function updateHeatMap() {

    let startTime = new Date()

    try {

        //From the Coordinates Table, result recieves the coordinates and 
        //stores the amount of duplicate coordinates in sum
        const result = await Coordinates.aggregate([
            { "$group": { "_id": { x: "$x", y: "$y" }, "count": { "$sum": 1 } } }
        ])

        //This upserts the results in the Heatmap Table
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

    let endTime = new Date();
    let timeDifference = Math.ceil((endTime.getTime() - firstDate.startTime()));
    console.log("Updated Heatmap in "+ timeDifference +"ms");
}


while(true)
{
    updateHeatMap();
    setTimeout(delayBetweenUpdates)
}