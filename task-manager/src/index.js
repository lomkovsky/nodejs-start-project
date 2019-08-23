const express = require('express');
require('./db/mongoose');
const User = require('./models/user.js');
const Task = require('./models/task.js');
const app = express();
// const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

app.use(express.json());

//read all users
app.get('/users', async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  };
});

//read user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('USER NOT FOUND!');
    }
    res.send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).json({ error: `Not valid id ${req.params.id}` });
    }
    console.log(JSON.stringify(e, null, 2));
    res.status(500).send();
  };
});

//update user by ID
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).send({error: 'Invalid updates!'});
    };
    try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send('USER NOT FOUND!');
    };
    res.send(user);
    } catch (e) {
      if (e.name === 'CastError') {
        return res.status(400).json({ error: `Not valid id ${req.params.id}` });
      };
      console.log(JSON.stringify(e, null, 2));
      res.status(500).send();
    };
});

// create a new user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  };
});

// delete a user
app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send('USER NOT FOUND!');
      }
      res.send({massage: 'user deleted'});
    } catch (e) {
      if (e.name === 'CastError') {
        return res.status(400).json({ error: `Not valid id ${req.params.id}` });
      }
      console.log(JSON.stringify(e, null, 2));
      res.status(500).send();
    };
  });


//read all tasks
app.get('/tasks', async (req, res) => {
  try {
    const task = await Task.find();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  };
});

//read task by ID
app.get('/tasks/:id', async (req, res) => {S
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('task NOT FOUND!');
    }
    res.send(task);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).json({ error: `Not valid id ${req.params.id}` });
    }
    console.log(JSON.stringify(e, null, 2));
    res.status(500).send('TASK NOT FOUND!');
  };
});

// create a new task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  };
});

//update task by ID
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'completed', 'description' ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
      if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
      };
      try {
      const tast = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!tast) {
        return res.status(404).send('TASK NOT FOUND!');
      };
      res.send(tast);
      } catch (e) {
        if (e.name === 'CastError') {
          return res.status(400).json({ error: `Not valid id ${req.params.id}` });
        };
        console.log(JSON.stringify(e, null, 2));
        res.status(500).send();
      };
  });

// delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).send('TASK NOT FOUND!');
      }
      res.send({massage: 'task deleted'});
    } catch (e) {
      if (e.name === 'CastError') {
        return res.status(400).json({ error: `Not valid id ${req.params.id}` });
      }
      console.log(JSON.stringify(e, null, 2));
      res.status(500).send();
    };
  });

// start server
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
