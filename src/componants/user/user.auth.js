const appError = require("../../utils/appError");
const userModel = require("./user.model");
const bcrypt = require('bcrypt');
const catchAsyncErrors = require("express-async-handler");
var jwt = require('jsonwebtoken');
const factory = require('../Handlers/handle.factory');



module.exports.signUp = () => {
    return catchAsyncErrors(async (req, res, next) => {
    const { name, email, password,phone } = req.body;
    let checkemail = await userModel.findOne({email})
    if (checkemail){
        return next(new appError("email already exists", 400));
    }
    let checkphone = await userModel.findOne({phone})
    if (checkphone){
        return next(new appError("phone number already exists", 400));
    }
    let newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({message:"user created successfully",newUser});
      });
}

module.exports.signIn = () => {
    return catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const checkemail = await userModel.findOne({email})
    if (checkemail){
        const checkpassword = await bcrypt.compare(password, checkemail.password)
        if (checkpassword){
            const token = jwt.sign({id:checkemail._id,name:checkemail.name,email:checkemail.email},process.env.secretKey)
            res.status(200).json({message:"sucess login",token})
        }else{
            next(new appError("incorrect email or password", 404));
        }
    }else{
        next(new appError("incorrect email or password", 404));
    }
    })
}

module.exports.protectedRoute = () => {
    return catchAsyncErrors(async (req, res, next) => {
    let token=req.headers.token;
    if(!token) return next(new appError("you are not logged in", 401)); 

    let decoded=jwt.verify(token,process.env.secretKey)
    if(!decoded) return next(new appError("you are not verified", 401));
    
    let user=await userModel.findById(decoded.id)
    if(!user) return next(new appError("the user for this token is not exists", 401));

    if(user.changePasswordAt){  
        let changepassword=parseInt(user.changePasswordAt.getTime()/1000); // convert to seconds
        if(changepassword>decoded.iat) 
        return next(new appError("user recently changed password! please log in again", 401));
    }
    req.user=user;
    next();
    })
}
 // authorize roles
module.exports.allowTo = (...roles) => {
    return catchAsyncErrors(async (req, res, next) => {
        if(!roles.includes(req.user.role))
        return next(new appError("you are not allowed to access this route", 403))
        next();
    })
}