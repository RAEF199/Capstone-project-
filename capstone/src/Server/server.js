
// Setup empty JS object to act as endpoint for all routes
var projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));
// Spin up the server

const port = 5050;
const listening1 = ()=>{
    console.log(`running on localhost: ${port}`);
};

// Callback to debug
const server = app.listen(port, listening1);

// Initialize all route with a callback function
app.get('/info', function(req,res){
    res.send(projectData);
})
// Post Route
app.post('/info', function (req,res){
  newEntry = {
      lng:req.body.lng,
      lat:req.body.lat,
      countryCode:req.body.countryCode,
      temp:req.body.temp,
      feelsLike:req.body.feelsLike,
      weather:req.body.weather,
      max_temp:req.body.max_temp,
      min_temp:req.body.min_temp,
      feelsLikeMax:req.body.feelsLikeMax,
      feelsLikeMin:req.body.feelsLikeMin,
      img:req.body.img
  }
  projectData= newEntry;
  console.log(projectData)
});