const { Product, Supplier } = require('../models')

class ProductController {
  static getAllProduct (req, res, next) {
    Product.findAll({
      include: [{
        model: Supplier
      }]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static createProduct (req, res, next) {
    let inputDataProduct = {
      name: req.body.name,
      price: req.body.price,
      SupplierId: req.currentSupplierId,
      selling_area: req.body.selling_area
    }
    Product.create(inputDataProduct)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static findOne (req, res, next) {
    let productId = req.params.inputDataProduct
    Product.findOne({
      where: {
        id: productId
      },
      include: [{
        model: Supplier
      }]
    })
      .then(data => {
        if (data) {
          res.status(200).json(data)
        } else {
          next({name: 'Not Found Product'})
        }
        
      })
      .catch(next)
  }

  static updateProduct (req, res, next) {
    let productId = req.params.id
    let dataUpdate = {
      name: req.body.name,
      price: req.body.price,
      selling_area: req.body.selling_area
    }
    Product.update(dataUpdate, {
      where : {
        id: productId
      },
      include: [{
        model: Supplier
      }],
      returning: true
    })
      .then(data => {
        let updatedData = data[1][0]
        res.status(200).json(updatedData)
      })
      .catch(next)
  }
  
}

module.exports = ProductController