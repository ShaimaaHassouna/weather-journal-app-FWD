// <<the server-side code>> //

// <<require>>
//'Express'-> to run server and routes
const express = require('express');
//'Body-parser' middleware
const bodyParser = require('body-parser');
//'cors' package, for providing a Connect>Express middle-ware.
const cors = require('cors');

// Start up and instance of app-> by creat const app
const app = express();

// <<Middleware>> //
//configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//use cros-> to cross origin allowance
app.use(cors());

// <<Initialize main project folder>> //
// connect server-side(code in server.js) to client-side(code written in the files housed in the website.js folder)
app.use(express.static('website'));

//creat listen (port), localhost server
const port = 8080;

//Spin up the server to run it-> using arrow function
const server = app.listen(port, () => {
    // tells that the server is working (running)
    console.log("Server is running..");
    //in which port localhost it,s running, the valuo of const port
    console.log(`On local Host: http://localhost:${port}`);
}); // end arrow function

// Setup empty object-> to send all data taken from routes, endpoint all routes
projectData = {};

// <<set up Routs- POST & GET>> //
//GET-method-Rout-> using arrow function to get '/allGtData' by http://localhost:8080
app.get('/allGtData', (req, res) => {
    //response-> data from server to app
    //send the response data to the endpoint-> projectData object
    res.send(projectData);
}); //end (GET) arrow function

//POST-method-Rout-> using arrow function to POST '/addPoData' by http://localhost:8080
app.post('/addPoData', (req, res) => {
    //request-> data from app to server 
    //request (date, temp, feeling->(from user input))
    //setting a new property to an object -> lean it from (developer.mozilla.org)&((Dynamic Web Coding0 website 
    projectData['date'] = req.body.date,
        projectData['temp'] = req.body.temp,
        projectData['feel'] = req.body.feel
        // send the response data to the endpoint-> projectData object
    res.send(projectData);
    //print data 
    console.log(req.body);
}); //end (POST) arrow function