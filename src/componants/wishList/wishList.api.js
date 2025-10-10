const { protectedRoute, allowTo } = require("../user/user.auth");
const { addWishList, removeWishList, getWishList } = require("./wishList.service");

const router = require("express").Router();
router.use(protectedRoute(),allowTo("user"));
router.route("/").patch(addWishList()).delete(removeWishList()).get(getWishList());

module.exports = router;
