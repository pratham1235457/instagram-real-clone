const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  emailOrPhone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-z0-9._]+$/,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
