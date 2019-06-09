const mongoose = require('mongoose');
const User = require('./schemas/user');
const Coordinates = require('./schemas/coordinates');

mongoose.connect('mongodb://localhost/neiu-heatmap', {useNewUrlParser:true})
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err));

const dayvar = new User({
    username:'dayvar14',
    name:'daniel'
})
dayvar.save()
const adam = new User({
    username:'adam14',
    name:'adam'
})

adam.save();


async function add(model)
{
    try{
        const result = await model.save();
        console.log(result);
    }
    catch(ex)
    {
        console.log(ex.message);
    }
}

async function upsert(values)
{
    options = { upsert: true };
    const result = await Coordinates.findOneAndUpdate(values.data,values.updatedData, options)
    console.log(result);
}

upsert({data:{x:20, y:50}, updatedData:{users:[dayvar._id]}});
upsert({data:{x:20, y:50}, updatedData:{users:[adam._id]}});
