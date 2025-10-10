const userModel = require('./user.model');
const factory = require('../Handlers/handle.factory');


module.exports.createUser = factory.createOne(userModel,{slugField:"name", folderName:"user"})

// get all users
module.exports.getAllUsers =factory.getAll(userModel)


// get specific user by id
module.exports.getSingleUser=factory.getOne(userModel)

// update user by id
module.exports.updateUser = factory.updateOne(userModel)

// delete user by id
module.exports.deleteUser = factory.deletOne(userModel)

// change user password by id
module.exports.changePassword = factory.changePassword(userModel)