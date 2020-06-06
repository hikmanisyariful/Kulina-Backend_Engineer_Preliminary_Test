const { User, Cart, CartProduct, Product} = require('../models')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register (req, res, next) {
    let customer
    let token
    let payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      role: 'user'
    }
    User.create(payload)
      .then(data => {
        customer = {
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address,
          role: data.role
        }
        token = generateToken({
          id: customer.id,
          name: customer.name,
          email: customer.email
        })
        let dataCustomer = {
          UserId: data.id
        }
        return Cart.create(dataCustomer)
      }) 
      .then(data => {
        res.status(201).json({
          user: customer,
          cartId: data.id,
          access_token: token
        })
      })
      .catch(next)
  }

  static addProductToCart (req, res, next) {
    let productId = req.params.productId
    let cartId = req.body.cartId
    let payload = {
      CartId: cartId,
      ProductId: productId,
      quantity: req.body.quantity,
      isCheckout:  false,
      delivery_date: req.body.delivery_date
    }
    CartProduct.create(payload)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static getCartUser (req, res, next) {
    let cartId = req.body.cartId
    CartProduct.findAll({
      where: {
        CartId: cartId,
        isCheckout: false
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static payment (req, res, next) {
    let cartId = req.body.cartId
    let cart = req.body.cart
    let delivery_date_changed = req.body.delivery_date_changed
    let successPay = []
    cart.forEach(el => {
      console.log(el)

      let item = {
        CartId: el.CartId,
        ProductId: el.ProductId,
        quantity: el.quantity,
        isCheckout: true,
        delivery_date: delivery_date_changed || el.delivery_date 
      }
      const newPromise = CartProduct.update(item, {
        where : {
          CartId : cartId,
          isCheckout: false,
          ProductId: item.ProductId
        }
      })
      successPay.push(newPromise)
    })

    Promise.all(successPay)
      .then(data => {
        res.status(200).json({
          message: 'Payment successfully'
        })
      })
      .catch(next)
  }

  static cancelOrder (req, res, next) {
    let items = []
    CartProduct.findAll({
      where: {
        CartId: req.body.cartId,
        isCheckout: false
      }
    })
      .then(data => {
        items = data
        let promises = []
        items.forEach(el => {
          const newPromise = CartProduct.destroy({
            where: {
              CartId: req.body.cartId,
              isCheckout: false
            }
          })
          promises.push(newPromise)
        })
        return Promise.all(promises)
      })
      .then(data => {
        res.status(200).json({
          message: 'Cancel Order successfully. Thanks You!'
        })
      })
      .catch(next)
  }
}

module.exports = UserController