const { signUp, signIn, protectedRoute, allowTo } = require("./user.auth");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  changePassword,
} = require("./user.service");

const router = require("express").Router();

router.post("/signup", signUp);

router
  .route("/")
  .post(protectedRoute(), allowTo("admin", "user"), createUser)
  .get(protectedRoute(), allowTo("admin"), getAllUsers);
router
  .route("/:id")
  .get(protectedRoute(), allowTo("admin"), getSingleUser)
  .put(protectedRoute(), allowTo("user"), updateUser)
  .delete(protectedRoute(), allowTo("admin", "user"), deleteUser);
router.patch(
  "/changePassword/:id",
  protectedRoute(),
  allowTo("admin", "user"),
  changePassword
);

router.post("/signin", signIn());

module.exports = router;
