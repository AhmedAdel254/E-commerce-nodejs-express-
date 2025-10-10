const { protectedRoute, allowTo } = require("../user/user.auth");
const { addaddresses, removeaddresses, getaddresses } = require("./address.servicce");

const router = require("express").Router();
router.use(protectedRoute(),allowTo("user"));
router.route("/").patch(addaddresses()).delete(removeaddresses()).get(getaddresses());


module.exports = router;
