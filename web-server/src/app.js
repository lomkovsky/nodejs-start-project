const path = require('path');
const express = require('express');
const calck = require('chalk');
const app = express();
const publicFolderPath = path.join(__dirname, '../public');
app.use(express.static(publicFolderPath));
app.get('/weather', (req, res) => {
    res.send({ name: "Weather page"});
});
app.listen(3000, () => {
    console.log(calck.green('Server start at port 3000'));
});
