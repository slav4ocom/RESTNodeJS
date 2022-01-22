# RESTNodeJS - REST API written in Node.js

this API provides data in json for weather forecast in Bulgaria.

data is collected in separate <b>cityname.json</b> file for each city.

A background service collects it from anothers free access APIs on internet. This is in order to not exceed theirs quotes. Also background service can collect data from another sources like ESP32 weather stations.

Currently data is collected from rapidapi.com <b> Open Weather Map API </b> on every 5 minutes
