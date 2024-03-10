const Product = require('../model/productModel');




const getProducts = async(req, res) => {

    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProduct = async(req, res) => {

    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {
            res.status(404, `Cannot find the product with id ${id}`)
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            res.status(404, `Cannot find the product with id ${id}`)
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            res.status(404, `Cannot find the product with id ${id}`)
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}



module.exports = {
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProduct
}