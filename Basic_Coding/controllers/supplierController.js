const { Supplier, Product } = require('../models')
const { generateToken } = require('../helpers/jwt')

class SupplierController {
  static register(req, res, next) {
    let inputData = {
      store_name: req.body.store_name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      role: 'supplier'
    }
    Supplier.create(inputData)
      .then(data => {
        let payload = {
          id: data.id,
          store_name: data.store_name,
          email: data.email,
          role: data.role
        }
        let token = generateToken(payload)
        res.status(201).json({
          supplier : data,
          access_token: token
        })
      })
      .catch(next)
  }
}

module.exports = SupplierController