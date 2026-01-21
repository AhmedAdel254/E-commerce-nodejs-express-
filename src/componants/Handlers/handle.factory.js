const catchAsyncErrors = require("express-async-handler");
const appError = require("../../utils/appError");
const slugify = require("slugify");
const Apifeatures = require("../../utils/Apifeatures");
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
// create one document
module.exports.createOne = (model, options = {}) => {
  return catchAsyncErrors(async (req, res, next) => {
      if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {folder:`ecommerce/${options.folderName}`  || "default"});
      // خزّن اللينك في body
      req.body.image = result.secure_url;
    }
    if (options.slugField) {
      req.body.slug = slugify(req.body[options.slugField]);
    }
    if(req.files){
      if(req.files.imageCover){
        const result = await cloudinary.uploader.upload(req.files.imageCover[0].path, {folder:`ecommerce/${options.folderName}`  || "default"});
        req.body.imageCover = result.secure_url;
      }
      if(req.files.images){
        let imgs=[];
        for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path,{folder:`ecommerce/${options.folderName}`  || "default"});
          imgs.push( result.secure_url)
        }
        req.body.images=imgs
    }}

    if(req.body.email){
      let chechkemail=await model.findOne({email:req.body.email})
      if(chechkemail){
        return next(new appError("email already exists", 400));
      }
    }
    // review
    if(options.review){
      let isReview=await model.findOne({user:req.user._id,product:req.body.product})
      if(isReview){
        return next(new appError("you already reviewed this product", 400));
      }
       
    }
    if(req.body.code){
      let checkcode=await model.findOne({code:req.body.code})
      if(checkcode){
        return next(new appError("you already created a copoun", 400));
      }
    
    }
    let document = new model(req.body);
      await document.save();
    res.status(200).json(document);
      })};

// get all documents
module.exports.getAll = (model) => {
  return catchAsyncErrors(async (req, res, next) => {
    let mergeParams = {};
    if (req.params.categoryId) {
      mergeParams = { category: req.params.categoryId };
    }
    let apiFeature = new Apifeatures(model.find(mergeParams), req.query)
      .pagination()
      .filter()
      .sort()
      .fields()
      .search(); 
    let documents = await apiFeature.mongooseQuery;
    res.status(200).json({ page:apiFeature.page , documents });
  });
};

// get one document by id
module.exports.getOne = (model) => {
  return catchAsyncErrors(async (req, res, next) => {
    let { id } = req.params;
    let document = await model.findById(id);
    if (!document) {
      next(new appError("No document for this id", 404));
    } else {
      res.status(200).json(document);
    }
  });
};

// update one document
module.exports.updateOne = (model,options = {}) => {
  return catchAsyncErrors(async (req, res, next) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if(req.file){
     const result = await cloudinary.uploader.upload(req.file.path, {folder:`ecommerce/${options.folderName}`  || "default"});
      // خزّن اللينك في body
      req.body.image = result.secure_url; 
    }
    if(options.review){
      let { id } = req.params 
      let isReview=await model.findById(id)
      if (!isReview) {
        return next(new appError("No review found with this ID", 404));
        }
        // check if the review belong to the user
      if(isReview.user._id.toString() !== req.user._id.toString()){
        return next(new appError("you can't update this review", 400))
      }
    }
    
    let document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    !document && next(new appError("No document for this id", 404));
    document && res.status(200).json(document);
  });
};

// delete one document
module.exports.deletOne = (model,options = {}) => {
  return catchAsyncErrors(async (req, res, next) => {
    if(options.review){
      let { id } = req.params 
      let isReview=await model.findById(id)
      if (!isReview) {
        return next(new appError("No review found with this ID", 404));
        }
        // check if the review belong to the user
      if(isReview.user._id.toString() !== req.user._id.toString() && req.user.role!=="admin"){
        return next(new appError("you can't delete this review", 400))
      }
    }
    let { id } = req.params;
    let document = await model.findByIdAndDelete(id);
    !document && next(new appError("No document for this id", 404)); // badal ma a3ml if (el 2 w7ed)
    document && res.status(200).json(document);
  });
};

module.exports.changePassword = (model) => {
  return catchAsyncErrors(async (req, res, next) => {
    req.body.changePasswordAt=Date.now()
    let document = await model.findByIdAndUpdate(req.user._id,req.body,{new:true});
    !document && next(new appError("No document for this id", 404));
    document && res.status(200).json(document);
    res.status(200).json(document)
  });
};