# RESTNodeJS - REST API written in Node.js

This API provides data in json for weather forecast in Bulgaria.

Data is collected in separate <i>cityname.json</i> file for each city. Currently no relative database is supported.

A background service is intended to collect data from free access APIs on internet. Secondary provision to https://github.com/slav4ocom/WeatherSPA is achieved by this service in order to not exceed primary source API quotes. Also background service in future can be made to collect data from another sources like ESP32 weather stations.

Currently data is collected from rapidapi.com <b> Open Weather Map API </b> on every 5 minutes. You must provide <i>apikey.txt</i> file in main directory with api key in order to access this service. Visit it's website to find out how to get one.
