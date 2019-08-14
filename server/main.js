// Importing http core module
const http = require('http');

//Importing express framework
const express = require('express');
const app = express();

//Request counter
let counter = 0;

//Creating map data structure 
const map = new Map();

//Setting the keys values
for(let i = 1; i <= 25; i++)
{
    map.set('' + i, 0);
};

//app.get uses the express framework to check url request
//depending on the one it enters
//it'll send a corresponding response 
app.get('/favicon.ico', (req, res) =>
{   
    res.send('favicon request');
});

app.get('/', (req,res) =>
{
    counter++;
    res.sendFile('./map_display.html',{root: __dirname });
    for (const [k, v] of map.entries()) 
    {
        console.log(k, v);
    }
    console.log('Number of requests: ', counter);
});

app.get('/location/id="a",LAG="45",LAT="67"', (req, res) =>
{    
    //If the url parameters include /location/ (id number)
    //it'll enter and update the map key value corresponding
    //to the id
    counter++;
    res.sendFile('./map_display.html',{root: __dirname });
    let id = req.params.id;
    let x = req.params.LAG;
    let y = req.params.LAT;
    let mVal = map.get( '' + location) + 1;
    let updateMap = map.set('' + location, mVal);
    await upsert(Coordinates, {username: id}, {x: x, y: y, lastUpdate: new Date});

    for (const [k, v] of map.entries()) 
    {
        console.log(k, v);
    }
    console.log('Number of requests: ', counter);

});
app.get('/map_content.csv', (req,res) =>
{
    res.sendFile(__dirname +'/map_content.csv');

});

// Variable PORT will take the value of PORT if it is available otherwise it'll use 4001
const PORT = process.env.DB_HOST || 4001;

// Setting the variable to listen for incoming requests by using the listen method of myServer
app.listen(PORT);
console.log('The server is now running...');