module.exports = (err, req, res, next) => {
  console.log(err)
  let status = 500
  let errObj = {
    message: 'Internal Server Error'
  }

  if (err.name === 'Please Register/Login first') {
    status = 401
    errObj = {
      message: 'NOT AUTHENTICATED',
      errors: [err.name]
    }
  } else if (err.name === 'Invalid Token Errors') {
    status = 401
    errObj = {
      message: 'NOT AUTHENTICATED',
      errors: [err.name]
    }
  } else if (err.name === 'Not Found Product') {
    status = 404
    errObj = {
      message: 'NOT FOUND',
      errors: [err.name]
    }
  } else if (err.name === 'Not Authorized') {
    status = 401
    errObj = {
      message: 'NOT AUTHIRIZED',
      errors: [err.name]
    }
  }

  res.status(status).json(errObj)
}