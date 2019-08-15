const path = require('path');
const express = require('express');
const calck = require('chalk');
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
    res.send({ name: "Weather page"});
});
app.listen(3000, () => {
    console.log(calck.green('Server start at port 3000'));
});
