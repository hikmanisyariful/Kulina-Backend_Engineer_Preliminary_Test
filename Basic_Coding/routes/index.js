const express = require('express')
const router = express.Router()
const users = require('./user.js')
const suppliers = require('./supplier.js')
const products = require('./product.js')

router.use(users)
router.use('/suppliers', suppliers)
router.use(products)

module.exports = router