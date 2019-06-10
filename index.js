const Heatmap = require('./schemas/heatmap');
const mongoose = require('mongoose');
const User = require('./schemas/user');
const Coordinates = require('./schemas/coordinates');

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


const coordinates = new Coordinates({
    x: 20, y: 30,
    username: "dayvar14"
})
const coordinates2 = new Coordinates({
    x: 20, y: 30,
    username: "adam14"
})
const coordinates3 = new Coordinates({
    x: 10, y: 20,
    username: "racheal"
})
const coordinates4 = new Coordinates({
    x: 20, y: 90,
    username: "mmboy"
})

async function upsert(model, data, updatedData) {
    options = { upsert: true };
    const result = await model.findOneAndUpdate(data, { $set: updatedData }, options)
}


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
    console.log(result)
    return result;
}

async function updateHeatMap() {
    try {
        const result = await Coordinates.aggregate([
            { "$group": { "_id": { x: "$x", y: "$y" }, "count": { "$sum": 1 } } }
        ])

        for (i = 0; i < result.length; i++) {
            await console.log(result[i]);
            /*
            heatmap = await new Heatmap({
                x: result[i]._id.x,
                y: result[i]._id.y,
                count: result[i].count
            });*/
            try{
                await upsert(Heatmap,{x:result[i]._id.x,y:result[i]._id.y}, {count:result[i].count});
                console.log(result);
            }
            catch(ex)
            {
                console.log(ex.message)
            }
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
}
add(coordinates);
add(coordinates2);
add(coordinates3);
add(coordinates4);
updateHeatMap();
