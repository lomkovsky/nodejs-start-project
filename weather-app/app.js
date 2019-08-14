const request = require('request');
const chalk = require('chalk');
const yargs = require('yargs');
const geoCode = require('./utils/geoCode.js');
const weatherCode = require('./utils/weatherCode.js');
yargs.command({
    command: 'name',
    describe: 'name of place',
    builder: {
        is: {
            describe: 'is of place',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        geoCode(argv.is, (error, data) => {
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
    }
});
yargs.parse();
