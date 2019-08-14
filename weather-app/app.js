const request = require('request');

// callback function that give us a latitude, longitude and name of place

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibG9ta292c2t5IiwiYSI6ImNqemI1ZHRtazAyOWwzZG1oZWZmZ2g2amEifQ.O2Ubdm4UBoPvtZqudQsmzA&limit=1'
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geo service!');
        } else if (response.body.features === 0) {
            callback('Unable to find geo location');
        } else {
            callback(undefined, {
                place: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            });
        };
    });            
};
geoCode('Micolaiv, Ukraine', (error, data) => {
    //console.log(data.body)
    if (error) {
        console.log(error);
    } else {
        console.log('Place name is ' + data.place);
        console.log('latitude name is ' + data.latitude);
        console.log('longitude name is ' + data.longitude);
        weatherCode(data.latitude, data.longitude, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Timezome is ' + data.body.timezone);
                console.log('Temperature is ' + data.body.currently.temperature + ' C');
            }; 
        });
    };
});

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
}

