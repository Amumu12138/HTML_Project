const jwt = require('jsonwebtoken')

exports.verToken = function (token) {
  return new Promise((resolve, reject) => {
    var userInfo = jwt.verify(token, 'jason')
    resolve(userInfo)
  }).catch((error) => {
    reject(error)
  })
}