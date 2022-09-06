const express= require('express')
const app = express()
const dotenv = require('dotenv')
const port =  5000
const connectDB = require('./config/config')
connectDB();
const router = require('./routes/routes')

app.use(express.json())

app.use('/', router)

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`)
} )





