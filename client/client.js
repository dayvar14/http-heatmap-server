const mongoose = require('mongoose');
const Heatmap = require('../schemas/heatmap');

mongoose.connect('mongodb://localhost/NEIUHeatMap', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

async function findAllDocuments() {
    let firstDate = new Date();
    const result = await Heatmap.find({}).sort({count:-1}).lean();
    let secondDate = new Date();
    let timeDifference = Math.ceil((secondDate.getTime() - firstDate.getTime()));
    console.log(result);
    console.log("Updated Heatmap in "+ timeDifference +"s");
}

findAllDocuments()
