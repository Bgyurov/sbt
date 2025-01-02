const UAParser = require("ua-parser-js");
const uuidv4 = require("uuid").v4;
const Visitor = require("../models/Visitor");

const visitorLogger = async (req, res, next) => {
  if (req.originalUrl === "/favicon.ico") return next();

  let visitorId = req.cookies["visitorId"] || req.body.fingerPrintId;
  if (!visitorId) {
    visitorId = uuidv4();
    res.cookie("visitorId", visitorId, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  }

  const parser = new UAParser();
  const userAgent = req.headers["user-agent"];
  const result = parser.setUA(userAgent).getResult();

  const forwardedIps = req.headers["x-forwarded-for"];
  let realIp = "";

  if (forwardedIps) {
    realIp = forwardedIps.split(",")[0];
  } else {
    realIp = req.socket.remoteAddress;
  }

  if (realIp.substr(0, 7) === "::ffff:") {
    realIp = realIp.substr(7);
  }

  const visitorData = {
    visitorId,
    ip: realIp,
    userAgent,
    pageUrl: req.originalUrl,
    browserLanguage: req.body.browserLanguage || req.headers["accept-language"],
    localBrowserTime: req.body.localBrowserTime || new Date().toLocaleString(),
  screenResolution: req.body.screenResolution || "unknown",
  isTouchable: req.body.isTouchable !== undefined ? req.body.isTouchable : false,
    browser: result.browser.name,
    os: result.os.name,
    fingerPrintId: req.body.fingerPrintId,
  };

  const existingVisitor = await Visitor.findOne({ visitorId: visitorId });
  if (existingVisitor) {
    console.log("Returning visitor detected.");
  } else {
    try {
      await new Visitor(visitorData).save();
      console.log("New visitor added.");
    } catch (err) {
      console.error("Error saving visitor data:", err);
    }
  }

  next();
};

module.exports = visitorLogger;
