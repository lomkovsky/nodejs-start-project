const request = require('request');
// const url = 'https://api.darksky.net/forecast/4b7b0ea5f3c454a1b63f90c9014b2f27/37.8267,-122.4233?lang=uk&units=si';
// request({ url: url, json: true}, (error, response) => {
//     const data = response;
//     console.log(data.body.currently);
// });
const geoUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2,%20%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,%20Ukraine.json?access_token=pk.eyJ1IjoibG9ta292c2t5IiwiYSI6ImNqemI1ZHRtazAyOWwzZG1oZWZmZ2g2amEifQ.O2Ubdm4UBoPvtZqudQsmzA&limit=1'
request({ url: geoUrl, json: true}, (error, response) => {
    const data = response;
    console.log(data.body.features[0].center[0], data.body.features[0].center[1]);
const weatherUrl = `https://api.darksky.net/forecast/4b7b0ea5f3c454a1b63f90c9014b2f27/${data.body.features[0].center[0]},${data.body.features[0].center[1]}?lang=uk&units=si`;
console.log(weatherUrl);
request({ url: weatherUrl, json: true}, (error, response) => {
         const data = response;
         console.log(data.body.currently);
    });
})
