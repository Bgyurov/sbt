const express = require('express')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const setupViewEngine = require('./config/viewEngine')
const initDatabase = require('./config/dataBaseInit')
const PORT = process.env.PORT || 3000
const app = express()
setupViewEngine(app)

app.use(cookieParser())
app.use(express.static('static'))
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(router)




initDatabase()
.then(() => app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`)))
.catch((err) => console.error(err))
