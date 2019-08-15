console.log(require('dotenv').config());
require('dotenv').config({path: __dirname + '/.env'});

const mongoose = require('mongoose');
const Heatmap = require('../schemas/heatmap');
const delay = require('../lib/delay');

//Connects to Heatmap Database
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//Grabs all Documents and stores info into an array
async function recieveCoordinates() {
    array = []
    const result = await Heatmap.find({}).select("x y count").sort({ count:-1 }).lean();
    

    for (key in result) {
        array.push([result[key].x, result[key].y, result[key].count]);
    }

}

async function main()
{
    try{
        while(true)
        {
            heatmapArray = await recieveCoordinates();
            await delay(process.env.DELAY_BETWEEN_REQUESTS)
        }
    }
    catch(ex)
    {
        console.log(ex.message)
    }
}

main();