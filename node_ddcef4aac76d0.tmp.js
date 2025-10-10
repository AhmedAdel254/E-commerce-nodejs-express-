const express = require('express')
const app = express()
require('dotenv').config({path :'./config/.env'})
const port = process.env.PORT || 4000
const morgan = require('morgan');
app.use(express.json())

app.use('/categories',require('./src/componants/category/category.api'))
if(process.env.MODE_ENV==='development'){
    app.use(morgan('dev'));
}
const {dbConnection}=require('./src/database/dbConnection')
dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))