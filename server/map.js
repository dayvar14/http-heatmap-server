require('dotenv').config({path: __dirname + '/.env'});

const mongoose = require('mongoose');
const Heatmap = require('../schemas/heatmap');
const fs = require('fs');
const delay = require('../delay')

//Connects to Heatmap Database
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//Grabs all Documents and saves
async function recieveCoordinates() {
    //Record 

    let requestTime = new Date();
    array = []
    const result = await Heatmap.find({}).select("x y count").sort({ count:-1 }).lean();
    

    for (key in result) {
        array.push([result[key].x, result[key].y, result[key].count]);
    }

    //Records time elapsed between request and response
    let responseTime = new Date();
    let timeDifference = Math.ceil((responseTime.getTime() - requestTime.getTime()));

    //Prints to console the time it took to recieve coordinates
    console.log("Recieved heatmap in " + timeDifference + "ms");
    return array;
}

//Writes Array to file
function arrayToFile(array)
{
    var file = fs.createWriteStream('map_content.txt');
    file.on('error', function(err) {  try { } catch(err) {console.log("Could not write to file.")} });
    array.forEach(function(item) { file.write(item.join(',') + '\n'); });
    file.end();
}

async function main()
{
    try{
        while(true)
        {
            heatmapArray = await recieveCoordinates();
            arrayToFile(heatmapArray);
            await delay(process.env.UPDATE_HEATMAP_DELAY)
        }
    }
    catch(ex)
    {
        console.log(ex.message)
    }
}

main();