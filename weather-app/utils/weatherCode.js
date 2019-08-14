const request = require('request');

// callback function that give us a temperature and name of time zone

const weatherCode = (latitude, longitude, callback) => {
    const weatherUrl = 'https://api.darksky.net/forecast/4b7b0ea5f3c454a1b63f90c9014b2f27/' + latitude + ',' + longitude + '?lang=uk&units=si';    
    request({ url: weatherUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (response.body.error){
            callback('Unable to find weather location');
        } else {
            callback(undefined, response)
        };
    });
};
module.exports = weatherCode;
