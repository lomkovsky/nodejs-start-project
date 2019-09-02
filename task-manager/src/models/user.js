const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error('Email is invalid')
      };
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw Error('Age must be a positive number');
      };
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw Error('password can not contain "password"');
      };
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
},{
  timestamps: true
});

// reference with task database
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// delete privet data from response
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
// create token write to database and return it
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, "thisisit");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

// find user by email and compare the hash and plain password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  };
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  };
  return user;
};

// hash the plain password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  };
  next();
});

// hash delete all tasks of user who is deleted himself
userSchema.pre('remove', async function(next) {
  const user = this;
  const task = await Task.find ({ owner: user._id });
  console.log(task);
  await Task.deleteMany({ owner: user._id });
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
