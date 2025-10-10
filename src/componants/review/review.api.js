const { protectedRoute, allowTo } = require("../user/user.auth");
const {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("./review.service");

const router = require("express").Router();

router
  .route("/")
  .post(
    protectedRoute(),
    allowTo("user"),
    createReview
  )
  .get(protectedRoute(),
    allowTo("user","admin"),getAllReview);
router
  .route("/:id")
  .get(protectedRoute(),
  allowTo("user","admin"),getSingleReview)
  .put(
    protectedRoute(),
    allowTo("user","admin"),
    updateReview
  )
  .delete(protectedRoute(), allowTo("admin","user"), deleteReview);

module.exports = router;
