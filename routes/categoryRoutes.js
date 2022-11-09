const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);
router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

module.exports = router;
