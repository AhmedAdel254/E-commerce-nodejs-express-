const userModel = require("../user/user.model");
const appError = require("../../utils/appError");
const catchAsyncErrors = require("express-async-handler");

module.exports.addWishList = () => {
  return catchAsyncErrors(async (req, res, next) => {
    let {wishList} = await userModel.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishList: req.body.product} },
      { new: true }
    );
    !wishList && next(new appError("No document for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    wishList && res.status(200).json(wishList);
  });
};

module.exports.removeWishList = () => {
  return catchAsyncErrors(async (req, res, next) => {
    let {wishList} = await userModel.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishList: req.body.product} },
      { new: true }
    );
    !wishList && next(new appError("No document for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    wishList && res.status(200).json(wishList);
  });
};

module.exports.getWishList = () => {
  return catchAsyncErrors(async (req, res, next) => {
    let {wishList} = await userModel.findById(req.user._id);
    !wishList && next(new appError("No document for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    wishList && res.status(200).json(wishList);
  });
};
