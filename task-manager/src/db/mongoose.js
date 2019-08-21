const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';


mongoose.connect(connectionURL, { 
    useNewUrlParser: true,
    useCreateIndex: true 
});


// const me = new User({
//     name: "lomkovsky",
//     age: 36,
//     email: "Ssds@gmail.com",
//     password: "fdfPdassword"
// });
// me.save().then(() => console.log("data saved")).catch((e) => console.log(e));

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// });
// const task = new Task({
//     description: "go to work   ",
//     completed: true
// });
// task.save().then(() => console.log("task saved ", task)).catch((e) => console.log("error!", e));

