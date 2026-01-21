const multer  = require('multer');
const appError = require('./appError');
const fs = require('fs');
const path = require('path');

// Set up multer for file uploads

function storage(folderName){
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'+folderName);
    },
    filename: function (req, file, cb) {
      const ext = Date.now() + '-'+Math.round(Math.random() * 1E9) + file.originalname;
      cb(null, ext);
    }
  })

function fileFilter (req, file, cb) {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new appError ("image only",401), false)
    }
}
  const upload = multer({ storage: storage,fileFilter:fileFilter })
  return upload
}


module.exports.uploadSingleImage = (folderName,fileName)=>{
return storage(folderName).single(fileName)
}


module.exports.uploadMixFile = (folderName,fileUploads)=>{
return storage(folderName).fields(fileUploads)
}


