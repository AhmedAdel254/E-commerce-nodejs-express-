const productModel = require("./product.model");
const catchAsyncErrors = require('express-async-handler')
const appError = require("../../utils/appError");
const slugify = require('slugify');
const factory = require('../Handlers/handle.factory');

// create product
module.exports.createProduct = factory.createOne(productModel,{slugField:"name", folderName:"product"})


// get all products
module.exports.getAllProducts = factory.getAll(productModel)


// get specific product by id
module.exports.getSingleProduct=factory.getOne(productModel)


// update product by id
module.exports.updateProduct = factory.updateOne(productModel)

// delete product by id
module.exports.deleteProduct = factory.deletOne(productModel)