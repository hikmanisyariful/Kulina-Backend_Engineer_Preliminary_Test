const { Product } = require('../models')

module.exports = (req, res, next) => {
  let productId = req.params.id
  Product.findByPk(productId)
    .then(data => {
      if (data) {
        if (data.SupplierId === req.currentSupplierId) {
          next()
        } else {
          next({
            name: 'Not Authorized'
          })
        }
      } else {
        next({
          name: 'Not Found Product'
        })
      }
    })
}