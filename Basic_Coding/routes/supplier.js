const express = require('express')
const router = express.Router()
const SupplierController = require('../controllers/supplierController.js')

router.post('/register', SupplierController.register)

module.exports = router