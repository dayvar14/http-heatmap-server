const mongoose = require('mongoose');
const Heatmap = require('../schemas/heatmap');

//Connects to Heatmap Database
mongoose.connect('mongodb://localhost/NEIUHeatMap', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//Grabs all Documents and saves
async function recieveCoordinates() {
    //Record 
    let requestTime = new Date();
    const result = await Heatmap.find({}).select("x y count").sort({ count:-1 }).lean();

    array = []
    for (key in result) {
        array.push([result[key].x, result[key].y, result[key].count]);
    }

    //Records time elapsed between request and response
    let responseTime = new Date();
    let timeDifference = Math.ceil((responseTime.getTime() - requestTime.getTime()));

    //Prints to console the time it took to recieve coordinates
    console.log("Recieved heatmap in " + timeDifference + "ms");
    console.log(result);
    return result;
}

coordinates = recieveCoordinates();

async function writeToFile(coordinates){
    console.log(coordinates);
}
