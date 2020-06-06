const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController.js')

router.post('/register', UserController.register)
router.post('/addToCart/:productId', UserController.addProductToCart)
router.get('/cart', UserController.getCartUser)
router.put('/payment', UserController.payment)
router.delete('/cancel', UserController.cancelOrder)

module.exports = router