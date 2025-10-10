process.on('uncaughtException',(err)=>{
    console.log('Uncaught Exception!',err.name,err.message); 
})
const express = require('express')
const {dbConnection}=require('./src/database/dbConnection')
const app = express()
const appError=require('./src/utils/appError')
const {globalMiddleWare}=require('./src/utils/globalMiddleWare')
require('dotenv').config({path :'./config/.env'})
const port = process.env.PORT || 4000
const morgan = require('morgan');
const { routes } = require('./src/utils/routes');
app.use(express.json()) 
app.set('query parser', 'extended') // 3shan a3ml filter b3d kda 3la el get all

// أي ملفات جوا فولدر uploads تبقى متاحة على اللينك /uploads
app.use(express.static( 'uploads'));

// routes
routes(app) // 3shan yro7 ll routes

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
