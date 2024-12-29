const router = require("express").Router();
const homeController = require("./controllers/safe-controller");
const moneyController = require("./controllers/money-controller");
const visitorLogger = require("./middleware/visitor-logger");

router.get("/", homeController.getSafePage);

router.post("/", visitorLogger, homeController.getSafePage);

router.get("/money", visitorLogger, moneyController.getMoneyPage);

router.use("*", homeController.getErrorPage);

module.exports = router;
