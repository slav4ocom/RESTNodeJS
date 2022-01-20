
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listusers', function (req, res) {
    fs.readFile("users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
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