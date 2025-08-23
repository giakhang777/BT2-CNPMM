const CRUDService = require('../services/CRUDService');
const User = require('../models/user.mongo');

// Trang home
async function getHomePage(req, res) {
  try {
    const data = await User.find({}).lean();
    return res.render('homepage.ejs', { data: JSON.stringify(data) });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Server error');
  }
}

function getAboutPage(req, res) {
  return res.render('test/about.ejs');
}

function getCRUD(req, res) {
  return res.render('crud.ejs');
}

async function postCRUD(req, res) {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send('Post crud to server');
}

async function getFindAllCrud(req, res) {
  const data = await CRUDService.getAllUser();
  // Map _id → id để giữ nguyên view cũ
  const datalist = data.map(u => ({ ...u, id: u._id }));
  return res.render('users/findAllUser.ejs', { datalist });
}

async function getEditCRUD(req, res) {
  const userId = req.query.id;
  if (!userId) return res.send('không lấy được id');

  const userData = await CRUDService.getUserInfoById(userId);
  if (!userData) return res.send('Not find user');

  const data = { ...userData, id: userData._id };
  return res.render('users/editUser.ejs', { data });
}

async function putCRUD(req, res) {
  const data = await CRUDService.updateUser(req.body);
  const datalist = data.map(u => ({ ...u, id: u._id }));
  return res.render('users/findAllUser.ejs', { datalist });
}

async function deleteCRUD(req, res) {
  const id = req.query.id;
  if (!id) return res.send('Not find user');
  await CRUDService.deleteUserById(id);
  return res.send('Deleted!!!!!!!!!!!!');
}

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD
};
