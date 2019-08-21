const express = require('express');
require('./db/mongoose');
const User = require('./models/user.js');
const Task = require('./models/task.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// create a new user
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => 
        res.status(201).res.send(user))
        .catch((e) => {
        res.status(400).send(e);
    });
    
});

// create a new task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => 
        res.status(201).res.send(task))
        .catch((e) => {
        res.status(400).send(e);
    });
    
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
