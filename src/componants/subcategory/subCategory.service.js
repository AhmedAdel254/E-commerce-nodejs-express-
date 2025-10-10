const subCategoryModel = require("./subCategory.model");
const slugify = require("slugify");
const catchAsyncError = require("express-async-handler");
const appError = require("../../utils/appError");
const factory = require('../Handlers/handle.factory');

// create subCategory
module.exports.createSubCategory =factory.createOne(subCategoryModel,{slugField:"name"})


// get all subCategories
module.exports.getSubCategories =factory.getAll(subCategoryModel)

// get specific subCategory
module.exports.getSubCategory=factory.getOne(subCategoryModel)


// update specific subCategory
module.exports.updateSubCategory=factory.updateOne(subCategoryModel)

// delete specific subCategory
module.exports.deleteSubCategory=factory.deletOne(subCategoryModel)
