const express = require('express');
require('./db/mongoose');
// const User = require('./models/user.js');
const Task = require('./routers/task.js');
const User = require('./routers/user.js');
const app = express();
// const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
// returns JSON
app.use(express.json());
// connection routers of /users
app.use(User);
// connection routers of /tasks
app.use(Task);
// start server
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
