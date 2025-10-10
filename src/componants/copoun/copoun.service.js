const copounModel = require("./copoun.model");
const factory = require('../Handlers/handle.factory');

// create copoun
module.exports.createCopoun = factory.createOne(copounModel)

// get all copouns
module.exports.getAllCopouns =factory.getAll(copounModel)


// get specific copoun by id
module.exports.getSinglecopoun= factory.getOne(copounModel)

// update copoun by id
module.exports.updateCopoun = factory.updateOne(copounModel)

// delete copoun by id
module.exports.deleteCopoun = factory.deletOne(copounModel)