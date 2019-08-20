const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';


mongoose.connect(connectionURL, { 
    useNewUrlParser: true,
    useCreateIndex: true 
});

// const User = mongoose.model('User', {
//   name: {
//     type: String
//   },
//   age: {
//     type: Number
//   }  
// });

// const me = new User({
//     name: "lom",
//     age: 36
// });
// me.save().then(() => console.log("data saved")).catch((e) => console.log(e));

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});
const todayTask = new Task({
    description: "go to work",
    completed: true
});
todayTask.save().then(() => console.log("data saved ", todayTask)).catch((e) => console.log("error!", e));

