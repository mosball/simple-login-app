module.exports = (express, database) => {
    const router = express.Router()

    /* GET home page. */
    router.get('/', (req, res, next) => {
        res.locals.userName = ''
        res.render('index')
    })

    router.post('/duplicateIdCheck', (req, res, next) => {
        res.json({
            isDuplicated: database.test(req.body.id),
        })
    })

    return router
}