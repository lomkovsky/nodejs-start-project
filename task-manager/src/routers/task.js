const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.js');
const Task = require('../models/task.js');

  //read all tasks
  router.get('/tasks', auth, async (req, res) => {
    const match = {};
    if(req.query.completed){
      match.completed = req.query.completed === 'true';
    };
    try {
      // const task = await Task.find({owner: req.user._id});
      await req.user.populate({
        path: 'tasks',
        match
      }).execPopulate();
      res.send(req.user.tasks);
      // res.send(task);
    } catch (e) {
      res.status(500).send(e);
    };
  });
  
  //read task by ID
  router.get('/tasks/:id', auth, async (req, res) => {
    try {
      // const task = await Task.findById(req.params.id);
      const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
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
  router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    });
    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(400).send(e);
    };
  });
  
  //update task by ID
  router.patch('/tasks/:id', auth, async (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = [ 'completed', 'description' ];
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
          return res.status(400).send({error: 'Invalid updates!'});
        };
        try {
          const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Task.findById(req.params.id);
        if (!task) {
          return res.status(404).send('TASK NOT FOUND!');
        };
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();  
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
  router.delete('/tasks/:id', auth, async (req, res) => {
      try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
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
