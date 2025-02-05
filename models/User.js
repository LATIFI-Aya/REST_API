const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);

