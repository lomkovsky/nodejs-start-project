const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  }]
});

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
  console.log('findByCredentials');
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error('Unable to login');
  };
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error('Unable to login');
  };

  console.log(user);
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

const User = mongoose.model('User', userSchema);

module.exports = User;
