
module.exports.globalMiddleWare=(err,req,res,next)=>{ // global error handling middleware
    err.statusCode=err.statusCode || 501;
    if(err.message=='Unexpected field'){
        err.message=" Too many image to upload"
    }
    if(process.env.MODE_ENV==='development'){
        devMode(err,res);
    }else{
        prodMode(err,res);
    }
    
}

let devMode=(err,res)=>{
    res.status(err.statusCode).json({
        status: err.statusCode ,
        message: err.message ,
        stack: err.stack
    })
}
let prodMode=(err,res)=>{
     res.status(err.statusCode).json({
        status: err.statusCode ,
        message: err.message
    })
}