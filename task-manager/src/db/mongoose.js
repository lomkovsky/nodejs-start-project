const mongoose = require('mongoose');
const validator = require('validator');
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';


mongoose.connect(connectionURL, { 
    useNewUrlParser: true,
    useCreateIndex: true 
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
        if (!validator.isEmail(value)){
            throw Error('Email is invalid')
        };    
    }
  },  
  age: {
    type: Number,
    default: 0,
    validate(value){
        if (value < 0){
            throw Error('Age must be a positive number');
        };
    } 
  },
  password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value){
          if (value.toLowerCase().includes('password')) {
            throw Error('password can not contain "password"');
          };
      }
  }  
});

// const me = new User({
//     name: "lomkovsky",
//     age: 36,
//     email: "Ssds@gmail.com",
//     password: "fdfPdassword"
// });
// me.save().then(() => console.log("data saved")).catch((e) => console.log(e));

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});
const task = new Task({
    description: "go to work   ",
    completed: true
});
task.save().then(() => console.log("task saved ", task)).catch((e) => console.log("error!", e));

