
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

    fs.readFile("data/" + cityName + '.json', 'utf8', function (err, data) {
        result = data;
        res.header("Access-Control-Allow-Origin", "*");
        res.end(result);
    });


    console.log('readFile called');
});

function SetCityData() {
    const cities = ['sofia', 'plovdiv', 'varna', 'bourgas', 'rousse', 'pleven', 'tarnovo'];
    var timeout = 0;
    cities.forEach(element => {
        setTimeout(GetCityData, timeout += 1000, element);
    });
}

setInterval(SetCityData, 5 * 60 * 1000);

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});
