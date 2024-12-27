//model ot thing
const Crypto = require('../models/Crypto')


// CRUD OPERATION FOR MODEL
exports.getOne = (thingId) => Crypto.findById(thingId)

exports.update = (thingId,data) => Crypto.findByIdAndUpdate(thingId,data, {runValidators: true})

exports.delete = (thingId) => Crypto.findByIdAndDelete(thingId)


    