const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    cartItem:[
            {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            quantity:Number,
            price:Number  
    }],
    totalPrice:{
        type: Number,
        required: [true,'Total price is required'],
    },
    shippingAddress:{
        details: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card'],
      default: 'cash',
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,
    status: {
      type: String,
      enum: ["pending", "canceled", "processing", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", Schema);
    
