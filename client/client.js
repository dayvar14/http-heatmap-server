require('dotenv').config({path: __dirname + '/.env'});

const mongoose = require('mongoose');
const User = require('../schemas/user');
const Coordinates = require('../schemas/coordinates');
const delay = require('../delay');

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//Database
async function upsert(model, data, updatedData) {
    options = { upsert: true };
    const result = await model.findOneAndUpdate(data, { $set: updatedData }, options)
}
///Test Clients

async function createTestUsers()
{
    users = [];
    for (i = 0; i < users.length; i++){
        const user = new User({
            username: 'User'+i,
            firstName: 'firstName'+i,
            lastName: 'lastName'
        });
        users.push(user);
        console.log(user)
    }
    return users;
}



async function main()
{
    try{
        users = await createTestUsers();
        console.log(users);
        while(true)
        {
            for( user in users){
                await upsert(Coordinates, user.username, {x:Math.floor(Math.random()*maxCoordinate), y:Math.floor(Math.random()*maxCoordinate), lastUpdate:new Date});
            }

            await delay(process.env.DELAY_BETWEEN_UPDATES);
        }
    }
    catch(ex)
    {
        console.log(ex.message);
    }
}

main();