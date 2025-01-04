const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  visitorId: String,
  ip: String,
  userAgent: String,
  pageUrl: String,
  browserLanguage: String,
  localBrowserTime: String,
  screenResolution: String,
  isTouchable: Boolean,
  isMobileResolution: Boolean,
  isHeadless: Boolean,
  browser: String,
  os: String,
  fingerPrintId: String,
});

const Visitor = mongoose.model("Visitor", VisitorSchema);

module.exports = Visitor;
