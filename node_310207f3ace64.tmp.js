const express = require('express')
const {dbConnection}=require('./src/database/dbConnection')
const app = express()
const appError=require('./src/utils/appError')
const {globalMiddleWare}=require('./src/utils/globalMIddleWare')
require('dotenv').config({path :'./config/.env'})
const port = process.env.PORT || 4000
const morgan = require('morgan');
app.use(express.json())

app.use('/api/v1/categories',require('./src/componants/category/category.api'))
if(process.env.MODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use((req, res, next) => {
next(new appError(`Can't find this route: ${req.originalUrl}`,404)) // 3shan yro7 ll global error handling middleware
});

app.use(globalMiddleWare)
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))