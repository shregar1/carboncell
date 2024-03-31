const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  urn: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  isLoggedIn: Boolean,
  updatedAt: {
    type: Date,
    default: null
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
