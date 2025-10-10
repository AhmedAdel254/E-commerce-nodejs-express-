const categoryModel = require('./category.model') 
const slugify = require('slugify')
const appError=require('../../utils/appError')
const catchAsyncErrors = require('express-async-handler') // for handling errors in async functions
const factory = require('../Handlers/handle.factory');



// Create and Save a new Category
module.exports.createCategory=factory.createOne(categoryModel)


// Retrieve and return all categories from the database.
module.exports.getCategories=factory.getAll(categoryModel)


// Find a specific category with a categoryId
module.exports.getCategory=factory.getOne(categoryModel)


// Update a category identified by the categoryId in the request
module.exports.updateCategory=factory.updateOne(categoryModel)

// Delete a category with the specified categoryId in the request
module.exports.deleteCategory=factory.deletOne(categoryModel)