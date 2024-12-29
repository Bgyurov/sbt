const router = require('express').Router()
const homeController = require('./controllers/homeController');
const visitorLogger = require('./middleware/visitorLogger');

router.get('/',homeController.getSafePage)

router.get('/money',visitorLogger, homeController.getMoneyPage)

router.post('/', visitorLogger, (req, res) => {

    if (req.originalUrl === '/') { 
        const { screenResolution, isTouchable  } = req.body;
    
        res.json({ message: 'Data received and processed' });
    } 
});

router.use('*',homeController.getErrorPage)

module.exports = router