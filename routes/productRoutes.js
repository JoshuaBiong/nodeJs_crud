const express = require('express')
const router = express.Router()
const Product = require('../model/productModel');




// =================== ROUTES ==========================

router.get('/', (req, res) => {
    res.send("Home")
})

// get all the PRODUCTS
router.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// get the PRODUCT
router.get('/product/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// udpate the PRODUCT 

router.put('/product/:id', async(req, res) => {
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
router.delete('/product/:id', async(req, res) => {
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
router.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }

})

module.exports = router