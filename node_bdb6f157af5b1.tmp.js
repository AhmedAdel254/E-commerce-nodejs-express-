process.on('uncaughtException',(err)=>{
    console.log('Uncaught Exception!',err.name,err.message); 
})
const express = require('express')
const {dbConnection}=require('./src/database/dbConnection')
const app = express()
const appError=require('./src/utils/appError')
const {globalMiddleWare}=require('./src/utils/globalMIddleWare')
require('dotenv').config({path :'./config/.env'})
const port = process.env.PORT || 4000
const morgan = require('morgan');
app.use(express.json())


// routes
app.use('/api/v1/categories',require('./src/componants/category/category.api'))
app.use('/api/v1/subCategories',require('./src/componants/subcategory/subCategory.api'))



if(process.env.MODE_ENV==='development'){
    app.use(morgan('dev'));
}


// handle unhandled routes
app.use((req, res, next) => {
next(new appError(`Can't find this route: ${req.originalUrl}`,404)) // 3shan yro7 ll global error handling middleware
});

app.use(globalMiddleWare)
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
process.on('unhandledRejection',(err)=>{
    console.log('Unhandled Rejection!',err.name,err.message); 
})