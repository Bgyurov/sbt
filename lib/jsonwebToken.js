
const jwtCallback = require('jsonwebtoken')
const utils = require('util')
//make sign and verify functions aschnronic

const jwt = {
   sign: utils.promisify(jwtCallback.sign),
   verify: utils.promisify(jwtCallback.verify)
}
module.exports = jwt
