const moment = require("moment-timezone");
const UAParser = require("ua-parser-js");

const moneyCloaker = (req, res, next) => {
  const parser = new UAParser();
  const userAgent = req.headers["user-agent"];
  const result = parser.setUA(userAgent).getResult();
  const gclid = req.query.gclid;
  const timeCheck = moment().tz("Europe/Sofia");

  if (!req.cookies.userData) {
    return res.redirect("/");
  }

  let userData;
  try {
    userData = JSON.parse(req.cookies.userData);
  } catch (e) {
    req.flash("error", "Access denied: Corrupted user data.");
    return res.redirect("/");
  }
  if (userData.isHeadless) {
    req.flash("error", "Access denied: Browser is headless.");
    return res.redirect("/");
  }

  if (userData.isTouchable) {
    req.flash("error", "Access denied: Device is touch-capable.");
    return res.redirect("/");
  }

  if (userData.isMobileResolution) {
    req.flash(
      "error",
      "Access denied: Device does not have mobile resolution."
    );
    return res.redirect("/");
  }

  if (!result.browser.name.includes("Chrome")) {
    req.flash("error", "Access denied: The browser is not Chrome.");
    return res.redirect("/");
  }

  if (timeCheck.hour() < 14 || timeCheck.hour() >= 18) {
    req.flash("error", "The current time is outside of the allowed interval.");
    return res.redirect("/");
  }

  if (!gclid) {
    req.flash("error", "Access denied: GCLID parameter is missing.");
    return res.redirect("/");
  }

  console.log("Access granted to money page.");
  next();
};

module.exports = moneyCloaker;
