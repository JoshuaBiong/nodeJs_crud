require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoutes')



const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL




// to display the data as JSON
app.use(express.json())
app.use('/api', productRoute)




// connecting to MongoDB
mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log("server is running at port", PORT)
    })
}).catch((error) => {
    console.log(error)
})