require('dotenv').config();

const fs = require('fs');
const Heatmap = require('../schemas/heatmap');
const mongoose = require('mongoose');
const Coordinates = require('../schemas/coordinates');
const delay = require('../lib/delay');
const query = require('../lib/query');

//Updates Heatmap with coordinates from the Coordinates Table then writes the coordinates
//to a csv file
async function updateHeatMap() {

    let startTime = process.hrtime()

    //Connects to HeatMap Database
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err));

    array = [];
    try {

        //From the Coordinates Table, result recieves the coordinates and 
        //stores the amount of duplicate coordinates in sum
        const result = await Coordinates.aggregate([
            { "$group": { "_id": { x: "$x", y: "$y" }, "count": { "$sum": 1 } } }
        ]);

        //This upserts the results in the Heatmap Table
        for (i = 0; i < result.length; i++) {
            try {
                await query.upsert(Heatmap, { x: result[i]._id.x, y: result[i]._id.y }, { count: result[i].count, lastUpdate: new Date });
            }
            catch (ex) {
                console.log(ex.message)
            }
        }
        mongoose.connection.close();
        //Stores results in an array and writes them to a file
        coordinateArray = [];
        for (key in result) {
            coordinateArray.push([result[key]._id.x, result[key]._id.y, result[key].count]);
        }
        console.log(coordinateArray);
        arrayToFile(coordinateArray, 'map_content.csv');

    }
    catch (ex) {
        console.log(ex.message);
    }

    let endTime = process.hrtime(startTime)
    console.log("Updated Heatmap in "+ endTime[1]/ 1000000 +"ms");
}

//Writes an array to a specified file
function arrayToFile(array, path)
{
    var file = fs.createWriteStream(path);
    file.on('error', function(err) {  try { } catch(err) {console.log("Could not write to file.")} });
    array.forEach(function(item) { file.write(item.join(',') + '\n'); });
    file.end();
}


async function run()
{
    try
    {
        while(true)
        {
            await updateHeatMap();
            await delay(process.env.HEATMAP_UPDATE_DELAY);
        }
    }
    catch(ex)
    {
        console.log(ex.message);
    }
}

run();
