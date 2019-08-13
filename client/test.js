require('dotenv').config({path: __dirname + '/.env'});

const mongoose = require('mongoose');
const User = require('../schemas/user');
const Coordinates = require('../schemas/coordinates');
const delay = require('../delay');

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//Database
async function upsert(model, key, data) {
    options = { upsert: true };
    const result = await model.findOneAndUpdate(key, { $set: data }, options)
}

///Test Clients

async function createTestUsers()
{
    users = [];
    for (i = 0; i < process.env.TEST_USER_AMOUNT; i++){
        const user = new User({
            username: 'User'+i,
            firstName: 'firstName'+i,
            lastName: 'lastName'+i
        });
        users.push(user);
    }
    return users;
}



async function main()
{
    try{
        users = await createTestUsers();
        while(true)
        {
            for( let i = 0; i < users.length; i++){
                let user = users[i];
                let userx = Math.floor(Math.random()*process.env.MAX_X);
                let usery = Math.floor(Math.random()*process.env.MAX_Y);
                await upsert(Coordinates, {username: user.username}, {x: userx, y: usery, lastUpdate: new Date});
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