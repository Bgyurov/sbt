const mongoose = require('mongoose')

const VisitorSchema  = new mongoose.Schema({
    ip: String,
  date: { type: Date, default: Date.now },
  userAgent: String,
  pageUrl: String,
  browserLanguage: String,
  localBrowserTime: String,
  screenResolution: String,
})



const Visitor = mongoose.model('Visitor', VisitorSchema);

module.exports = Visitor