var axios = require('axios');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=327154ccc2111803f5b0f1701c0ba6dc'
var Lodash = require('lodash');

var kelvinToF = function(kelvin){
    return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F';
}

module.exports= function(latitude, longitude){
    var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

     return fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        return {
            city: json.name,
            tempreture: kelvinToF(json.main.temp),
            description: Lodash.capitalize(json.weather[0].description)
        }
    });

}
