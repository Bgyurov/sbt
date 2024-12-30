const moment = require("moment-timezone");
const UAParser = require("ua-parser-js");

const moneyCloaker = (req, res, next) => {
  const parser = new UAParser();
  const userAgent = req.headers["user-agent"];
  const result = parser.setUA(userAgent).getResult();
  const gclid = req.query.gclid;
  const timeCheck = moment().tz("Europe/Sofia");

  if (result.browser.name !== "Chrome") {
    console.log("Access denied: The browser is not Chrome.");
    return res.redirect("/");
  }

  if (timeCheck.hour() < 10 || timeCheck.hour() >= 18) {
    console.log("The current time is outside of the allowed interval.");
    return res.redirect("/");
  }

  if (!gclid) {
    console.log("Access denied: GCLID parameter is missing.");
    return res.redirect("/");
  }

  console.log("Access granted to money page.");
  next();
};

module.exports = moneyCloaker;
