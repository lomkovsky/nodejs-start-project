const request = require('request');
const chalk = require('chalk');
const geoCode = require('./utils/geoCode.js');
const weatherCode = require('./utils/weatherCode.js');
const name = process.argv[2];
if (name) {
    geoCode(name, (error, data) => {
        if (error) {
            return console.log(chalk.red.inverse(error));
        } else {
            weatherCode(data.latitude, data.longitude, (error, weatherData) => {
                if (error) {
                    return console.log(chalk.red.inverse(error));
                } else {
                    console.log(chalk.blue.inverse('Place name is ' + data.place));
                    console.log(chalk.yellow('Timezome is ' + weatherData.body.timezone));
                    console.log(chalk.green.inverse('Temperature is ' + weatherData.body.currently.temperature + ' C'));
                };
            });
        };
    });
} else {
    console.log("Please type a name of location!")
}
