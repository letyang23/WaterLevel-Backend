// index.js
// This is our main server file
const axios = require('axios');
// include express
const express = require("express");
// create object to interface with express
const app = express();
app.use(express.json())

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

// No static server or /public because this server
// is only for AJAX requests

// respond to all AJAX querires with this message
app.use(function(req, res, next) {
  var year = req.query.year;
  var month = req.query.month;
  var date = year+"-"+month;
  var questUrl="https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=";
  var stationIDs = "SHA,ORO,CLE,NML,SNL,DNP,BER";
  var requestUrl = questUrl+stationIDs+"&SensorNums=15&Start="+date+"-1&End="+date+"-31";
  console.log(requestUrl)
  axios.get(requestUrl).then(data=>{
    res.json(data.data)
  }).catch(err=>{
    console.log(err);
  })
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});