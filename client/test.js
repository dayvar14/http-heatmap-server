require('dotenv').config();
require('dotenv').config({path: __dirname + '/client.env'});

const mongoose = require('mongoose');
const User = require('../schemas/user');
const Coordinates = require('../schemas/coordinates');
const delay = require('../lib/delay');
const query = require('../lib/query');

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


//Creates TEST_USER_AMOUNT of users with random coordinates
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
                await query.upsert(Coordinates, {username: user.username}, {x: userx, y: usery, lastUpdate: new Date});
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