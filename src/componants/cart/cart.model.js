const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    cartItem:[
        {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
        quantity:Number,
        price:Number  
}
],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    totalPrice: Number,
    totalAfterDiscount: Number,
    discount: Number

}, { timestamps: true });

module.exports = mongoose.model('cart', Schema);