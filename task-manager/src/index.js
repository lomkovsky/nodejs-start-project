const express = require('express');
require('./db/mongoose');
// const User = require('./models/user.js');
const taskRouter = require('./routers/task.js');
const userRouter = require('./routers/user.js');
const app = express();
// const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
// returns JSON
app.use(express.json());
// connection routers of /users
app.use(userRouter);
// connection routers of /tasks
app.use(taskRouter);
// start server
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
