const { uploadMixFile } = require("../../utils/fileUploads");
const { protectedRoute, allowTo } = require("../user/user.auth");
const {
  createProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  getAllProducts,
} = require("./product.service");

const router = require("express").Router();

let fields = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
];

router
  .route("/")
  .post(
    protectedRoute(),
    allowTo("admin"),
    uploadMixFile("product", fields),
    createProduct
  )
  .get(getAllProducts);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(
    protectedRoute(),
    allowTo("admin"),
    uploadMixFile("product", fields),
    updateProduct
  )
  .delete(protectedRoute(), allowTo("admin"), deleteProduct);

module.exports = router;
