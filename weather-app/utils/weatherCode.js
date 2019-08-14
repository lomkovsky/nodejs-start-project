const request = require('request');

// callback function that give us a temperature and name of time zone

const weatherCode = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4b7b0ea5f3c454a1b63f90c9014b2f27/' + latitude + ',' + longitude + '?lang=uk&units=si';    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error){
            callback('Unable to find weather location');
        } else {
            callback(undefined, {
                timezone: body.timezone,
                summary: body.currently.summary,
                temperature: body.currently.temperature
            })
        };
    });
};
module.exports = weatherCode;
