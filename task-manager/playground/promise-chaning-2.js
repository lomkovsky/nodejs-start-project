require('../src/db/mongoose');
const Task = require('../src/models/task.js');
Task.findByIdAndDelete("5d5c1767d878152ec468cbb0")
.then(() => Task.countDocuments({completed: true}))
.then((result) => console.log(result))
.catch((e) => console.log(e));
