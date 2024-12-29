const Visitor = require("../models/Visitor");
const UAParser = require("ua-parser-js");
const uuidv4 = require("uuid").v4;
const moment = require("moment-timezone");

const visitorLogger = async (req, res, next) => {
  const parser = new UAParser();
  const ua = req.headers["user-agent"];
  const result = parser.setUA(ua).getResult();

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

  console.log(existingVisitor ? "Returning visitor." : "New visitor added.");
  const userAgent = req.headers["user-agent"];
  const referrer = req.headers["referer"] || req.headers["referrer"];
  const timeCheck = moment().tz("Europe/Sofia")
  const startTime = moment().tz("Europe/Sofia").set({ hour: 9, minute: 0, second: 0 }); // 9:00 сутринта
const endTime = moment().tz("Europe/Sofia").set({ hour: 21, minute: 0, second: 0 }); // 21:00 вечерта

  const gclid = req.query.gclid;  
  console.log(req.query)
  console.log('User agent:', userAgent);
  console.log(timeCheck)
  console.log('Referrer:', referrer);
  console.log('Gclid:', gclid);


 
    // Проверка за User-Agent
    if (!(userAgent.includes("Chrome"))) {
      console.log('Access denied: The browser is not Chrome.');
      return res.redirect("/");
  }

  if (!timeCheck.isAfter(startTime) || !timeCheck.isBefore(endTime)) {
    console.log("The current time is outside of the allowed interval.");
    return res.redirect("/");
  }
  // Проверка за GCLID
  if (!gclid) {
      console.log('Access denied: GCLID parameter is missing.');
      return res.redirect("/");
  }

  // Проверка за Referrer
  if (!(referrer && referrer.includes("google.com"))) {
      console.log('Access denied: Referrer is not google.com.');
      return res.redirect("/");
  }

  // Ако всички проверки минат
  console.log('All checks passed, proceeding to the page.');
  next();
};


module.exports = visitorLogger;
