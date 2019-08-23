const express = require('express');
const router = new express.Router();
const Task = require('../models/task.js');

  //read all tasks
  router.get('/tasks', async (req, res) => {
    try {
      const task = await Task.find();
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    };
  });
  
  //read task by ID
  router.get('/tasks/:id', async (req, res) => {S
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
  router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(400).send(e);
    };
  });
  
  //update task by ID
  router.patch('/tasks/:id', async (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = [ 'completed', 'description' ];
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
          return res.status(400).send({error: 'Invalid updates!'});
        };
        try {
        const task = await Task.findById(req.params.id);
        if (!task) {
          return res.status(404).send('TASK NOT FOUND!');
        };
        console.log(task);
        updates.forEach((update) => task[update] = req.body[update]);
        console.log(task);
        task.save();  
        //const tast = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        res.send(task);
        } catch (e) {
          if (e.name === 'CastError') {
            return res.status(400).json({ error: `Not valid id ${req.params.id}` });
          };
          console.log(JSON.stringify(e, null, 2));
          res.status(500).send();
        };
    });
  
  // delete a task
  router.delete('/tasks/:id', async (req, res) => {
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
    
module.exports = router;
