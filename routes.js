const router = require('express').Router()
const homeController = require('./controllers/homeController')


//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getSafePage)
router.get('/money',homeController.getMoneyPage)
router.use('*',homeController.getErrorPage)

module.exports = router