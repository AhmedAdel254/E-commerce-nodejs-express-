const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('./category.service');

const router = require('express').Router();
const subCategoryRoute=require('../subcategory/subCategory.api');
const { uploadSingleImage } = require('../../utils/fileUploads');
const { protectedRoute, allowTo } = require('../user/user.auth');



router.use('/:categoryId/subcategories',subCategoryRoute)
router.route('/').post(protectedRoute(),allowTo('admin'),uploadSingleImage('category','image'),createCategory).get(getCategories);
router.route('/:id').get(getCategory).put(protectedRoute(),allowTo('admin'),uploadSingleImage('category','image'),updateCategory).delete(protectedRoute(),allowTo('admin'),deleteCategory);
module.exports = router;