const orderModel = require("./order.model");
const appError = require("../../utils/appError");
const catchAsyncErrors = require("express-async-handler");
const cartModel = require("../cart/cart.model");


// user
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
    
    let cart = await cartModel.findOne({user:req.user._id})
    if(!cart) return next(new appError('There is no cart for this user',404))
    if (cart.cartItem.length === 0) {
    return next(new appError("Cart is empty", 400));
    }
    let order = await orderModel.create({
        user:req.user._id,
        cartItem:cart.cartItem,
        totalPrice :cart.totalAfterDiscount ||cart.totalPrice,
        shippingAddress:req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod || "cash",
})
    await cartModel.findOneAndDelete({ user: req.user._id })
    res.status(201).json({message:"order created successfuly",order})
})

exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user._id });
  if (!orders || orders.length === 0) {
    return next(new appError("No orders found for this user", 404));
  }
  res.status(200).json({ results: orders.length, orders });
});

exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await orderModel.findOne({
        user:req.user._id
    })
    if(!order) return next(new appError("No order found for this user",404))
    if(order.status === 'canceled'|| order.status === 'delivered') return next(new appError("This order is already canceled",400))
    order.status = 'canceled'
        await order.save()
        res.status(200).json({message:"order canceled successfuly",order})
})


// admin 

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  let orders = await orderModel.find().populate("user", "name email");
  res.status(200).json({ count: orders.length, orders });
});



exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) return next(new appError("Order not found", 404));

  if (order.status === "canceled") {
    return next(new appError("This order is already canceled", 400));
  }

  order.status = req.body.status;
  await order.save();

  res.status(200).json({ message: "Order status updated", order });
});


// PUT /api/v1/orders/:id/pay
exports.markOrderAsPaid = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) return next(new appError("Order not found", 404));

  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();

  res.status(200).json({ message: "Order marked as paid", order });
});


// PUT /api/v1/orders/:id/deliver
exports.markOrderAsDelivered = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) return next(new appError("Order not found", 404));

  order.isDelivered = true;
  order.isDeliveredAt = Date.now();
  await order.save();

  res.status(200).json({ message: "Order marked as delivered", order });
});
