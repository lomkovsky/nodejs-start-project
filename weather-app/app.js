const request = require('request');
const chalk = require('chalk');
const geoCode = require('./utils/geoCode.js');
const weatherCode = require('./utils/weatherCode.js');
const name = process.argv[2];
if (name) {
    geoCode(name, (error, {latitude, longitude, place}) => {
        if (error) {
            return console.log(chalk.red.inverse(error));
        } else {
            weatherCode(latitude, longitude, (error, {timezone, summary, temperature}) => {
                if (error) {
                    return console.log(chalk.red.inverse(error));
                } else {
                    console.log(chalk.blue.inverse('Place name is ' + place));
                    console.log(chalk.yellow('Timezome is ' + timezone));
                    console.log(chalk.green.inverse(summary + ' Temperature is ' + temperature + ' C'));
                };
            });
        };
    });
} else {
    console.log("Please type a name of location!")
}
