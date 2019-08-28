const express = require('express');
const auth = require('../middleware/auth.js');
const router = new express.Router();
const User = require('../models/user.js');
  // read all users
  router.get('/users', auth, async (req, res) => {
    try {
      const result = await User.find();
      res.send(result);
    } catch (e) {
      res.status(500).send(e);
    };
  });

  // read my profile
  router.get('/users/me', auth, async (req, res) => {
    try {
      res.send(req.user);
    } catch (e) {
      res.status(500).send(e);
    };
  });

  // login user and generate new token 
  router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // if (!user) {
        //   res.status(400).send({error: "Unable to login"});
        // }
        res.send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    };
  });

  // logout user
  router.post('/users/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.send('logout');
    } catch (e) {
      res.status(500).send();
    }
  });

  // logout all tokens user
  router.post('/users/logoutAll', auth, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send('logout all tokens');
    } catch (e) {
      res.status(500).send();
    }
  });


  // // read user by ID
  // router.get('/users/:id', auth, async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     if (!user) {
  //       return res.status(404).send('USER NOT FOUND!');
  //     }
  //     res.send(user);
  //   } catch (e) {
  //     if (e.name === 'CastError') {
  //       return res.status(400).json({ error: `Not valid id ${req.params.id}` });
  //     }
  //     console.log(JSON.stringify(e, null, 2));
  //     res.status(500).send();
  //   };
  // });
  
  // update my profile
  router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
      if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
      };
      try {
      // const user = await User.findById(req.params.id);
      // if (!user) {
      //   return res.status(404).send('USER NOT FOUND!');
      // };
      updates.forEach((update) => req.user[update] = req.body[update]);
      await req.user.save();  
      //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.send(req.user);
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
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    };
  });
  
  // delete a user
  router.delete('/users/me', auth, async (req, res) => {
      try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if (!user) {
        //   return res.status(404).send('USER NOT FOUND!');
        // }
        await req.user.remove();
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
