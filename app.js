const express      = require('express')
const path         = require('path')
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')
const logger       = require('morgan')
const Error        = require('./error')

const app = express()
const indexRouter = require('./routes/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json()) // 이건 뭘까요?
app.use(express.urlencoded({ extended: false })) // 이건 뭘까요?
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
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

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app