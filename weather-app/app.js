const request = require('request');
const geoUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2,%20%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0,%20Ukraine.json?access_token=pk.eyJ1IjoibG9ta292c2t5IiwiYSI6ImNqemI1ZHRtazAyOWwzZG1oZWZmZ2g2amEifQ.O2Ubdm4UBoPvtZqudQsmzA&limit=1'
request({ url: geoUrl, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to geo service!');
    } else if (response.body.error){
        console.log('Unable to find geo location');
    } else {
    const data = response;
    console.log('Place name is ' + data.body.features[0].place_name);
    const weatherUrl = `https://api.darksky.net/forecast/4b7b0ea5f3c454a1b63f90c9014b2f27/${data.body.features[0].center[1]},${data.body.features[0].center[0]}?lang=uk&units=si`;
    request({ url: weatherUrl, json: true}, (error, response) => {
        if (error) {
            console.log('Unable to connect to weather service!');
        } else if (response.body.error){
            console.log('Unable to find weather location');
        } else {
         const data = response;
         console.log('Timezome is ' + data.body.timezone);
         console.log('Temperature is ' + data.body.currently.temperature + ' C');
    }});
}})
