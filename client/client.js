const Heatmap = require('../schemas/heatmap');
const mongoose = require('mongoose');
const User = require('../schemas/user');
const Coordinates = require('../schemas/coordinates');

mongoose.connect('mongodb://localhost/NEIUHeatMap', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const dayvar = new User({
    username: 'dayvar14',
    firstName: 'daniel',
    lastName: 'ayvar'
});

const adam = new User({
    username: 'adam14',
    firstName: 'adam',
    lastName: 'johnson'
});

const rachel = new User({
    username: 'racheal',
    firstName: 'adam',
    lastName: 'johnson'
});

const micheal = new User({
    username: 'mmboy',
    firstName: 'adam',
    lastName: 'johnson'
});




async function upsert(model, data, updatedData) {
    options = { upsert: true };
    const result = await model.findOneAndUpdate(data, { $set: updatedData }, options)
}

/*
async function add(model) {
    try {
        const result = await model.save();
    }
    catch (ex) {
        console.log(ex.message);
    }
}

async function find(model) {
    const result = await model.find();
    console.log(result);
}

async function findDistinctCoordinates() {
    const result = await Coordinates.aggregate([
        { "$group": { "_id": { x: "$x", y: "$y" }, "count": { "$sum": 1 } } }
    ])
    return result;
}
*/
async function main()
{
    try{
        while(true)
        {
            await upsert(Coordinates, {username: "rachel"}, {x: 20, y:90, lastUpdate:new Date});
            await upsert(Coordinates, {username: "dayvar14"}, {x: 10, y:80, lastUpdate:new Date});
            await upsert(Coordinates, {username: "mmboy"}, {x: 10, y:40, lastUpdate:new Date});
            await upsert(Coordinates, {username: "adam14"}, {x: 20, y:10, lastUpdate:new Date});
            await delay(3000);
        }
    }
    catch(ex)
    {
        console.log(ex.message);
    }
}
function delay(t, val) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log("Updating")
            resolve(val);
        }, t);
    });
 }
main();