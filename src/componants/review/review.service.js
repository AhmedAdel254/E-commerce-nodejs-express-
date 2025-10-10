const reviewModel = require("./review.model");

const factory = require('../Handlers/handle.factory');
const { populate } = require("dotenv");

// create review
module.exports.createReview = factory.createOne(reviewModel,{ review: true })

// get all review
module.exports.getAllReview = factory.getAll(reviewModel)


// get specific review by id
module.exports.getSingleReview = factory.getOne(reviewModel)

// update review by id
module.exports.updateReview = factory.updateOne(reviewModel,{ review: true })

// delete review by id
module.exports.deleteReview = factory.deletOne(reviewModel,{ review: true })