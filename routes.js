const router = require("express").Router();
const homeController = require("./controllers/safe-controller");
const moneyController = require("./controllers/money-controller");
const visitorLogger = require("./middleware/visitor-logger");
const moneyCloaker = require("./middleware/money-cloaker");

router.get("/", homeController.getSafePage);

router.post("/", visitorLogger, homeController.getSafePage);

router.get("/money", moneyCloaker,moneyController.getMoneyPage);

router.use("*", homeController.getErrorPage);

module.exports = router;
