const path = require('path');
const express = require('express');
const chalk = require('chalk');
const geoCode = require('./utils/geoCode.js');
const weatherCode = require('./utils/weatherCode.js');
const hbs = require('hbs');

const app = express();

// Define path for Express config
const publicFolderPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicFolderPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'lom'    
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'lom'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpfulText: 'No one will helps you',
        name: 'lom'    
    });
});
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({error});
        } else {
            weatherCode(latitude, longitude, (error, {timezone, summary, temperature}) => {
                if (error) {
                    return res.send({error});
                } 
                    res.send({
                    place: place,
                    forecast: summary,
                    timezome: timezone,
                    temperature: temperature,
                    address: req.query.address
                    });
            });
        };
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        helpfulText: 'like I said - No one will helps you',
        name: 'lom'
    });    
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        helpfulText: 'Page not Found. Go away',
        name: 'lom'    
    });
});
app.listen(3000, () => {
    console.log(chalk.green('Server start at port 3000'));
});
