const brandModel = require("./brands.model");
const factory = require('../Handlers/handle.factory');

// create brand
module.exports.createBrand = factory.createOne(brandModel,{slugField:"name", folderName:"brand"})

// get all brands
module.exports.getAllBrands =factory.getAll(brandModel)


// get specific brand by id
module.exports.getSingleBrand=factory.getOne(brandModel)

// update brand by id
module.exports.updateBrand = factory.updateOne(brandModel)

// delete brand by id
module.exports.deleteBrand = factory.deletOne(brandModel)