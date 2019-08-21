const express = require('express');
require('./db/mongoose');
const User = require('./models/user.js');
const Task = require('./models/task.js');
const app = express();
// const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

app.use(express.json());

//read all users
app.get('/users', (req, res) => {
    User.find().then((result) => {
        res.send(result)
    }).catch((e) => {
        res.status(500).send(e);
    });
});

//read user by ID
app.get('/users/:id', (req, res) => {
   
    // let objId = null;
    // try {
    //     objId = mongoose.Types.ObjectId(req.params.id);
    // } catch (error) {
    //     return res.status(400).json({error: `Not valid id ${req.params.id}`});
    // }
    
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('USER NOT FOUND!'); 
        }
        res.send(user);
    }).catch((e) => {
        if(e.name === 'CastError') {
            return res.status(400).json({error: `Not valid id ${req.params.id}`});
        }
        console.log(JSON.stringify(e, null, 2));
        res.status(500).send();
    });
});
   


// app.get('/users/:name', (req, res) => {
//     const name = req.params.name;
//     User.find({ name: name }).then((user) => {
//         console.log(user);
//         if (!user.length) {
//             console.log('USER NOT FOUND!2')
//             return res.status(404).send('USER NOT FOUND!2'); // 'USER NOT FOUND!'
//         }
//         console.log('USER FOUND');
//         res.send(user);
//     }).catch((e) => {
//         console.log('USER NOT FOUND!3')
//         res.status(500).send('USER NOT FOUND!3');
//     });
// });


// create a new user
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => 
        res.status(201).res.send(user))
        .catch((e) => {
        res.status(400).send(e);
    });
    
});

//read all tasks
app.get('/tasks', (req, res) => {
    Task.find().then((result) => {
        res.send(result)
    }).catch((e) => {
        res.status(500).send(e);
    });
});

//read task by ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        res.send(task)
    }).catch((e) => {
        res.status(500).send('TASK NOT FOUND!3');
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
