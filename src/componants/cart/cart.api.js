const { protectedRoute, allowTo } = require("../user/user.auth");
const { addToCart, removeCart, updateCart, applyCopoun, getCart } = require("./cart.service");

const router = require("express").Router();
router.use(protectedRoute(), allowTo("user"));
router.route("/").post(addToCart()).delete(removeCart()).put(updateCart()).get(getCart);

  router.post('/applyCopoun', applyCopoun())


module.exports = router;
