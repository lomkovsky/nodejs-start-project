const request = require('request');
const url = 'https://api.darksky.net/forecast/4b7b0ea5f3c454a1b63f90c9014b2f27/37.8267,-122.4233?lang=uk&units=si';
request({ url: url, json: true}, (error, response) => {
    const data = response;
    console.log(data.body.currently);

})