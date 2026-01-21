const { protectedRoute, allowTo } = require("../user/user.auth");
const { createOrder, getUserOrders, getSingleUserOrders, cancelOrder, getAllOrders, updateOrderStatus, markOrderAsPaid, markOrderAsDelivered } = require("./order.service");

const router = require("express").Router();
router.use(protectedRoute());
router.route("/").post(allowTo("user"),createOrder).get(allowTo("user"),getUserOrders);
router.route("/:id").patch(allowTo("user"),cancelOrder);
router.route("/admin/allOrders").get(allowTo("admin"),getAllOrders);
router.route("/admin/updateOrder/:id").patch(allowTo("admin"),updateOrderStatus);
router.route("/:id/pay").put(allowTo("admin"),markOrderAsPaid);
router.route("/:id/deliver").put(allowTo("admin"),markOrderAsDelivered);

module.exports = router;
