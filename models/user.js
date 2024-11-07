const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
});

const User = mongoose.model('user', userSchema);
module.exports = User;