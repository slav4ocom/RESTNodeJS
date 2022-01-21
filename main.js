
var express = require('express');
var app = express();
var fs = require("fs");
const { runInNewContext } = require('vm');

app.get('/weather', function (req, res) {
    fs.readFile("weatherdata.csv", 'utf8', function (err, data) {
        forecast = new Object();
        forecast.cities = new Array;

        var rows = data.split("\r\n");

        cities = new Array;
        rows.forEach(row => {
            //console.log("row");
            //console.log(row);
            var cityElements = row.split(",");
            var city = new Object;

            city.name = cityElements[0];
            city.temp = cityElements[1];
            city.icon = cityElements[2];
            city.feels = cityElements[3];
            city.wind = cityElements[4];

            forecast.cities.push(city);
        });

        //console.log(cities);
        var result = JSON.stringify(forecast);
        console.log(result);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Cache-Control", "no-cache");
        res.end(result);
    });
})


var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})