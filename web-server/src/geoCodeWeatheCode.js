const express = require('express');
const chalk = require('chalk');
const geoCode = require('./utils/geoCode.js');
const weatherCode = require('./utils/weatherCode.js');

const GeoWeater  = geoCode(req.query.address, (error, {latitude, longitude, place}) => {
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
                res.send({
                    place: place,
                    forecast: summary,
                    timezome: timezone,
                    temperature: temperature,
                    address: req.query.address
                });
            };
        });
    };
});
module.exports = GeoWeater;