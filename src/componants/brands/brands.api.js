const { uploadSingleImage } = require("../../utils/fileUploads");
const { protectedRoute, allowTo } = require("../user/user.auth");
const { createBrand, getAllBrands, getSingleBrand, updateBrand, deleteBrand } = require("./brands.service");

const router = require("express").Router();
router.use(protectedRoute(),allowTo('admin'));
router.route("/").post(uploadSingleImage('brand','image'),createBrand).get(getAllBrands);
router.route("/:id").get(getSingleBrand).put(uploadSingleImage('brand','image'),updateBrand).delete(deleteBrand)


module.exports = router;
