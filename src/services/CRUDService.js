const bcrypt = require('bcryptjs');
const User = require('../models/user.mongo');

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
  return bcrypt.hash(password, salt);
};

// CREATE
async function createNewUser(data) {
  const hashed = await hashUserPassword(data.password);
  await User.create({
    email: data.email,
    password: hashed,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phoneNumber: data.phoneNumber,
    gender: data.gender === '1',
    roleId: data.roleId
  });
  return 'OK create a new user successfully';
}

// READ ALL
function getAllUser() {
  return User.find({}).lean();
}

// READ ONE
function getUserInfoById(userId) {
  return User.findById(userId).lean();
}

// UPDATE → trả lại danh sách sau update (giống flow cũ)
async function updateUser(data) {
  const { id, firstName, lastName, address } = data;
  await User.findByIdAndUpdate(id, { firstName, lastName, address });
  return User.find({}).lean();
}

// DELETE
function deleteUserById(userId) {
  return User.findByIdAndDelete(userId);
}

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById
};
