const express = require('express')
const router = express.Router()
const Product = require('../model/productModel');
const { getProducts, getProduct, deleteProduct, updateProduct, createProduct } = require('../controllers/productController')




// =================== ROUTES ==========================

router.get('/', (req, res) => { res.send("Home") })
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.delete('/product/:id', deleteProduct)
router.put('/product/:id', updateProduct)
router.post('/products', createProduct)

module.exports = router