const jwt = require('jsonwebtoken')
let SECRET = 'kulinasuccess'

module.exports = {
  generateToken : function(payload) {
    let token = jwt.sign(payload, SECRET)
    return token
  },
  verifyToken : function(token) {
    return jwt.verify(token, SECRET)
  }
}