require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose');
const Product = require('./model/productModel');

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL




app.use(express.json())



// =================== ROUTES ==========================

app.get('/', (req, res) => {
    res.send("Home")
})

// get all the PRODUCTS
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// get the PRODUCT
app.get('/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// udpate the PRODUCT 

app.put('/product/:id', async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            res.status(404).json({ message: `Cannot find product with id: ${id}` })
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete the product 
app.delete('/product/:id', async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: `Cannot find product with id: ${id}` })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// CREATE A PRODUCT
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }

})



// connecting to MongoDB
mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log("server is running at port", PORT)
    })
}).catch((error) => {
    console.log(error)
})