const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const setupViewEngine = require('./config/viewEngine')
const initDatabase = require('./config/dataBaseInit')
const visitorLogger = require('./middleware/visitorLogger')
const posrt = process.env.PORT || 3000
const app = express()
setupViewEngine(app)


app.use(cookieParser())
app.use(express.static('static'))
app.use(express.urlencoded({extended: false}))
app.use(visitorLogger)
app.use(router)




initDatabase()
.then(() => app.listen(posrt, ()=> console.log('Server is running on port 3000')))
.catch((err) => console.error(err))
