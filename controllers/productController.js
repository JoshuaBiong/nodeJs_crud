const Product = require('../model/productModel');
const asynhandler = require('express-async-handler')




const getProducts = asynhandler(async(req, res) => {

    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getProduct = asynhandler(async(req, res) => {

    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {
            res.status(404, `Cannot find the product with id ${id}`)
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)

    }
})

const deleteProduct = asynhandler(async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            res.status(404)
            throw new Error(`Cannot find the product with id ${id}`)

        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const updateProduct = asynhandler(async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            res.status(404)
            throw new Error(`Cannot find the product with id ${id}`)

        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const createProduct = asynhandler(async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})


module.exports = {
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProduct
}