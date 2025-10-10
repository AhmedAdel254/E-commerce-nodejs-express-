const userModel = require("../user/user.model");
const appError = require("../../utils/appError");
const catchAsyncErrors = require("express-async-handler");

module.exports.addaddresses = () => {
  return catchAsyncErrors(async (req, res, next) => {
    let {addresses} = await userModel.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { addresses: req.body } },
      { new: true }
    );
    !addresses && next(new appError("No address for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    addresses && res.status(200).json(addresses);
  });
};

module.exports.removeaddresses = () => {
  return catchAsyncErrors(async (req, res, next) => {
    let {addresses} = await userModel.findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: {_id: req.body.address}} },
      { new: true }
    );
    !addresses && next(new appError("No address for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    addresses && res.status(200).json(addresses);
  });
};

module.exports.getaddresses = () => {
  return catchAsyncErrors(async (req, res, next) => {
    let {addresses} = await userModel.findById(req.user._id);
    !addresses && next(new appError("No address for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    addresses && res.status(200).json(addresses);
  });
};
