const { verifyToken } = require('../helpers/jwt')
const { Supplier, User } = require('../models')

module.exports = (req, res, next) => {
  if (!req.headers.access_token) {
    next({
      name: 'Please Register/Login first'
    })
  } else {
    let decoded = verifyToken(req.headers.access_token)
    if (decoded.role === 'supplier') {
      try {
        Supplier.findByPk(decoded.id)
          .then(dataSupplier => {
            if (dataSupplier) {
              req.currentSupplierId = decoded.id
              req.emailSupplier = decoded.email
              next()
            } else {
              next ({
                name: 'Invalid Token Errors'
              })
            }
          })
          .catch(next)
      } catch (err) {
        next({
          name: 'Invalid Token Errors'
        })
      }
    } else {
      try {
        User.findByPk(decoded.id)
          .then(dataUser => {
            if (dataUser) {
              req.currentUserId = decoded.id
              req.emailUser = decoded.email
              next()
            } else {
              next ({
                name: 'Invalid Token Errors'
              })
            }
          })
          .catch(next)
      } catch (err) {
        next({
          name: 'Invalid Token Errors'
        })
      }
    }
    
  }
}