const { protectedRoute, allowTo } = require("../user/user.auth");
const { createCopoun, getAllCopouns, getSinglecopoun, updateCopoun, deleteCopoun } = require("./copoun.service");

const router = require("express").Router();
router.use(protectedRoute(),allowTo("admin"));
router.route("/").post(createCopoun).get(getAllCopouns);
router.route("/:id").get(getSinglecopoun).put(updateCopoun).delete(deleteCopoun)

module.exports = router;
