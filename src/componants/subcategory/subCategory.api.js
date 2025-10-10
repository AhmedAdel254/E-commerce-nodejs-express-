const { protectedRoute, allowTo } = require("../user/user.auth");
const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require("./subCategory.service");

const router = require("express").Router({mergeParams:true});

router.use(protectedRoute(),allowTo('admin'));
router.route('/').post(createSubCategory).get(getSubCategories)
router.route('/:id').get(getSubCategory).put(updateSubCategory).delete(deleteSubCategory)
module.exports = router;