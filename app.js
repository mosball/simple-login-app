const express      = require('express')
const path         = require('path')
const cookieParser = require('cookie-parser')
const logger       = require('morgan')
const Error        = require('./custom_modules/error')
const Database     = require('./custom_modules/database')
const Sessions     = require('./custom_modules/sessions')
const loginChecker = require('./custom_modules/loginChecker')

const app = express()
const database = new Database()
const sessions = new Sessions()
const indexRouter = require('./routes/index')(express, database, sessions)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json()) //body-parser 역할
app.use(express.urlencoded({ extended: false })) // 이건 뭘까요?
app.use(cookieParser())
app.use(loginChecker(sessions))
app.use(express.static(path.join(__dirname, 'public')))

//register router
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new Error(404, 'Not found'))
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.status = err.status

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app