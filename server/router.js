require('dotenv').config();

// Importing http core module
const http = require('http');

//Importing express framework
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Coordinates = require('../schemas/coordinates');
const query = require('../lib/query');

//app.get uses the express framework to check url request
//depending on the one it enters
//it'll send a corresponding response 
app.get('/favicon.ico', (req, res) =>
{   
    res.send('favicon request');
});

app.get('/', (req,res) =>
{
    res.sendFile('./map_display.html',{root: __dirname });
});

app.get('/location/:id,:lag,:lat', async (req, res) =>
{    
    //If the url parameters include /location/ (id number)
    //it'll enter and update the map key value corresponding
    //to the id
    //Connects to Heatmap Database
    mongoose.connect("mongodb://localhost/NEIUHeatMap", { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    let user = req.params.id;
    let userx = req.params.lag;
    let usery = req.params.lat;

    try{
        await query.upsert(Coordinates, {username: user}, {x: userx, y: usery, lastUpdate: new Date});
        res.send('completed');
    }
    catch( ex )
    {
        console.log(ex.message);
    }

    //Ends connection
    mongoose.connection.close();
});

app.get('/map_content.csv', (req,res) =>
{
    res.sendFile('./map_content.csv', {root: __dirname });

});
// Variable PORT will take the value of PORT if it is available otherwise it'll use 4001
const PORT = process.env.SERVER_PORT || 4001;

// Setting the variable to listen for incoming requests by using the listen method of myServer
app.listen(PORT);
console.log('The server is now running...');