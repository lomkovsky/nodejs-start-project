const request = require('request');

// callback function that give us a latitude, longitude and name of place

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibG9ta292c2t5IiwiYSI6ImNqemI1ZHRtazAyOWwzZG1oZWZmZ2g2amEifQ.O2Ubdm4UBoPvtZqudQsmzA&limit=1'
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geo service!');
        } else if (response.body.features == 0) {
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
module.exports = geoCode;
