
var express = require('express');
var app = express();
var fs = require("fs");
const { runInNewContext } = require('vm');

const https = require('https');
const { resourceUsage } = require('process');
const { Console } = require('console');

const apiKey = "12ab99a374msh86888c209888997p1c34b3jsn3c4215e0734c";

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'X-RapidAPI-Key': apiKey
    }
};


function SaveCityData(cityName) {
    fs.writeFile("data/" + cityName + ".json", cityData,
        {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        },
        (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                //console.log("The written has the following contents:");
                //console.log(fs.readFileSync("movies.txt", "utf8"));
            }
        });

}

let cityData;

function GetCityData(cityName) {
    cityData = '';
    var request = https.get('https://community-open-weather-map.p.rapidapi.com/weather?q=' + cityName + '&lat=0&lon=0&id=2172797&lang=null&units=metric&mode=json', options, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
            res.resume();
            return;
        }


        res.on('data', (chunk) => {
            cityData += chunk;
        });

        res.on('close', () => {
            console.log('Retrieved all data');
            //console.log(JSON.parse(cityData));
            SaveCityData(cityName);
        });
    });

    request.end();

    request.on('error', (err) => {
        console.error(`Encountered an error trying to make a request: ${err.message}`);
    });

}



app.get('/getdata/:city', function (req, res) {
    var cityName = req.params.city;
    GetCityData(cityName);
    res.end("OK");
});

app.get('/showdata/:city', function (req, res) {
    var cityName = req.params.city;
    var result = "this is weather data";
    console.log(cityName);

    //res.setHeader('Content-Type', 'text/html; charset=UTF-8');

    fs.readFile("data/" + cityName + '.json', 'utf8', function (err, data) {

        // Display the file content
        //console.log(data);
        result = data;
        res.end(result);
        //fs.close();
    });


    console.log('readFile called');
});

//
//
//    app.get('/weather', function (req, res) {
//        fs.readFile("weatherdata.csv", 'utf8', function (err, data) {
//            forecast = new Object();
//            forecast.cities = new Array;
//
//            var rows = data.split("\r\n");
//
//            cities = new Array;
//            rows.forEach(row => {
//                //console.log("row");
//                //console.log(row);
//                var cityElements = row.split(",");
//                var city = new Object;
//
//                city.name = cityElements[0];
//                city.temp = cityElements[1];
//                city.icon = cityElements[2];
//                city.feels = cityElements[3];
//                city.wind = cityElements[4];
//
//                forecast.cities.push(city);
//            });
//
//            //console.log(cities);
//            var result = JSON.stringify(forecast);
//            console.log(result);
//            res.header("Access-Control-Allow-Origin", "*");
//            res.header("Cache-Control", "no-cache");
//            res.end(result);
//        });
//    });


var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});
