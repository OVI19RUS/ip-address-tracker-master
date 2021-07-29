//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require('https')
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home")
  })

app.post('/', function(req, res){
    const ipAddress = req.body.ipInput;
    const apiKey = 'at_cwAjFcVQ3ZbN0YJIPToolWcuGanzT';
    const url = 'https://geo.ipify.org/api/v1?apiKey=' + apiKey + '&ipAddress=' + ipAddress;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data){
            const ipData = JSON.parse(data);
            const ip = ipData.ip;
            const city = ipData.location.city;
            const state = ipData.location.region;
            const timezone = ipData.location.timezone;
            const lat = ipData.location.lat;
            const lng = ipData.location.lng;
            const isp = ipData.as.name;
            res.render("result", {
                ip: ip,
                city: city,
                state: state,
                timezone: timezone,
                isp: isp,
                lat: lat,
                lng: lng
                });
})
})
})

app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running on port 3000.')
})