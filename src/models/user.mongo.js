const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    gender: { type: Boolean, default: false }, // 0: Male(false), 1: Female(true)
    image: { type: String },
    roleId: { type: String, trim: true },
    positionId: { type: String, trim: true }
  },
  { timestamps: true, collection: 'users' }
);

module.exports = mongoose.model('User', UserSchema);
