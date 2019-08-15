const path = require('path');
const express = require('express');
const calck = require('chalk');

const app = express();
const publicFolderPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
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
        title: 'No one will helps you'
    });
});
app.get('/weather', (req, res) => {
    res.send({ name: "Weather page"});
});
app.listen(3000, () => {
    console.log(calck.green('Server start at port 3000'));
});
