const UAParser = require("ua-parser-js");
const uuidv4 = require("uuid").v4;
const moment = require("moment-timezone");
const Visitor = require("../models/visitor");

const visitorLogger = async (req, res, next) => {
  const parser = new UAParser();
  const ua = req.headers["user-agent"];
  const result = parser.setUA(ua).getResult();
  const { isTouchable, isMobileResolution, isHeadless } = req.body;

  if (req.originalUrl === "/favicon.ico") {
    return next();
  }

  let visitorId = req.cookies["visitorId"];
  if (!visitorId) {
    visitorId = uuidv4();
    res.cookie("visitorId", visitorId, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  }

  const visitorData = {
    visitorId: visitorId,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    pageUrl: req.originalUrl,
    browserLanguage: req.body.browserLanguage,
    localBrowserTime: req.body.localBrowserTime,
    screenResolution: req.body.screenResolution,
    isTouchable: req.body.isTouchable,
    browser: result.browser.name,
    os: result.os.name,
  };

  const existingVisitor = await Visitor.findOne({ visitorId: visitorId });

  if (!existingVisitor) {
    new Visitor(visitorData).save().catch((err) => {
      console.error("Error saving visitor data", err);
    });
  }

  if (isTouchable || isMobileResolution || isHeadless) {
    console.log(
      "Access denied: The visitor is using a mobile device or a headless browser."
    );
    return res.redirect("/");
  }

  console.log(existingVisitor ? "Returning visitor." : "New visitor added.");
  const timeCheck = moment().tz("Europe/Sofia");
  const startTime = moment().tz("Europe/Sofia").set({ hour: 14, minute: 0, second: 0 });
  const endTime = moment().tz("Europe/Sofia").set({ hour: 18, minute: 0, second: 0 });
  const gclid = req.query.gclid;

  if (result.browser.name !== "Chrome") {
    console.log("Access denied: The browser is not Chrome.");
    return res.redirect("/");
  }

  if (!timeCheck.isAfter(startTime) || !timeCheck.isBefore(endTime)) {
    console.log("The current time is outside of the allowed interval.");
    return res.redirect("/");
  }
  if (!gclid) {
    console.log("Access denied: GCLID parameter is missing.");
    return res.redirect("/");
  }

  console.log("All checks passed, proceeding to the page.");
  next();
};

module.exports = visitorLogger;
