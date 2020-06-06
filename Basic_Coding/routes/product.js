const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.get('/products', ProductController.getAllProduct)
router.use(authentication)
router.post('/products', ProductController.createProduct)
router.get('/products/:id', ProductController.findOne)
router.put('/products/:id', authorization, ProductController.updateProduct)

module.exports = router