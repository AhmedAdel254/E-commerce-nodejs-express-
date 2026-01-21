const modelCart = require("./cart.model");
const appError = require("../../utils/appError");
const modelProduct = require("../product/product.model");
const modelCopoun = require("../copoun/copoun.model");
const catchAsyncErrors = require("express-async-handler");


function totalPrice(cart){
          let totalPrice=0;
            cart.cartItem.forEach((item) => {
                totalPrice+= item.price*item.quantity;
            })
            cart.totalPrice = totalPrice;

            if(cart.totalAfterDiscount){
            cart.totalAfterDiscount = (cart.totalPrice - ((cart.totalPrice * cart.discount) / 100)).toFixed(2);
            }
}

module.exports.addToCart = () => {
    return catchAsyncErrors(async (req, res, next) => {

        let {price} = await modelProduct.findById(req.body.product).select('price')
        req.body.price = price
        
        let cart = await modelCart.findOne({ user: req.user._id })
        if (!cart) {
            let newCart = new modelCart({
                    cartItem: [req.body],
                    user: req.user._id,
            });
            totalPrice(newCart);
            await newCart.save();
            res.status(200).json({message: "cart created successfuly", newCart});
        }else{
            let findProduct = cart.cartItem.find((item) => item.product==req.body.product);
            if(findProduct){
                findProduct.quantity += req.body.quantity;
            }else{
                cart.cartItem.push(req.body);
            }
            totalPrice(cart);
            await cart.save();
            res.status(200).json({message: "added to cart", cart});
        }

    })
}

module.exports.removeCart = () => {
  return catchAsyncErrors(async (req, res, next) => {
    let cart = await modelCart.findOneAndUpdate(
      { user: req.user._id},
      { $pull: { cartItem: {_id: req.body.itemId}} },
      { new: true }
    );
    totalPrice(cart);
    await cart.save();
    !cart && next(new appError("No cart for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    cart && res.status(200).json(cart);
  });
};


module.exports.updateCart = () => {
    return catchAsyncErrors(async (req, res, next) => {
        let cart = await modelCart.findOne({ user: req.user._id });
            let findProduct = cart.cartItem.find((item) => item.product==req.body.product);
            if(!findProduct) return next(new appError("No product in cart for this id", 404));
            if(findProduct){
                findProduct.quantity = req.body.quantity;
            }
            totalPrice(cart);
            await cart.save();
            res.status(200).json({message: "added to cart", cart});
        }
)
}

module.exports.applyCopoun = () => {
    return catchAsyncErrors(async (req, res, next) => {
        let copoun = await modelCopoun.findOne({ code: req.body.code, expires: {$gt: Date.now()} });        
        if(!copoun) return next(new appError("Copoun expired or invalid", 404));
        let cart = await modelCart.findOne({ user: req.user._id });
        cart.totalAfterDiscount = (cart.totalPrice - ((cart.totalPrice * copoun.discount) / 100)).toFixed(2);
        cart.discount = copoun.discount;
        await cart.save(); 
        res.status(200).json({message: "added to cart", cart});
        }
)
}


module.exports.getCart= catchAsyncErrors(async (req,res,next)=>{

    let cart = await modelCart.findOne({user:req.user._id})
    res.status(200).json({result:cart.cartItem.length, cart});

})




