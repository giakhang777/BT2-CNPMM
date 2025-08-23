const express = require('express');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
  const router = express.Router();

  router.get('/home', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);

  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getFindAllCrud);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  return app.use('/', router);
};
