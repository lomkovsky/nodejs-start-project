const express = require('express');
const router = new express.Router();
const User = require('../models/user.js');
  //read all users
  router.get('/users', async (req, res) => {
    try {
      const result = await User.find();
      res.send(result);
    } catch (e) {
      res.status(500).send(e);
    };
  });
  
  //read user by ID
  router.get('/users/:id', async (req, res) => {
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
  router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
      if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
      };
      try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('USER NOT FOUND!');
      };
      updates.forEach((update) => user[update] = req.body[update]);
      await user.save();  
      //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
  router.post('/users', async (req, res) => {
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
  router.delete('/users/:id', async (req, res) => {
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
  
module.exports = router;
