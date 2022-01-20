
var express = require('express');
var app = express();
var fs = require("fs");


//const city = {
//    name: "tarnovo",
//    temp: -2,
//    feels: -4,
//    wind: 10,
//    weather: "Mostly cloudy"
//}

var cities = new Array;


app.get('/weather', function (req, res) {
    fs.readFile("weatherdata.csv", 'utf8', function (err, data) {
        //var row = "tarnovo,-2,Mostly cloudy,-1,10".split(",");

        var rows = data.split("\r\n");

        cities = new Array;
        rows.forEach(row => {
            //console.log("row");
            //console.log(row);
            var cityElements = row.split(",");
            var city = new Object;
            
            city.name = cityElements[0];
            city.temp = cityElements[1];
            city.weather = cityElements[2];
            city.feels = cityElements[3];
            city.wind = cityElements[4];
            
            cities.push(city);
        });

        //console.log(cities);
        var result = JSON.stringify(cities);
        console.log(result);
        res.end(result);
    });
})

app.get('/weatherforecast', function (req, res) {
    fs.readFile("weatherdata.json", 'utf8', function (err, data) {
        //console.log(data);
        console.log('get weather from XMLHttpRequest');
        res.header("Access-Control-Allow-Origin", "*");
        res.end(data);
    });
})


var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})