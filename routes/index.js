module.exports = (express, database) => {
    const router = express.Router()

    /**
     * localhost:3000 으로 접속시 index.ejs를 rendering
     */
    router.get('/', (req, res, next) => {
        res.locals.userName = ''
        res.render('index')
    })

    /**
     * 아이디 중복체크를 수행
     * database.test 함수를 통해 아이디 중복 체크
     */
    router.post('/duplicateIdCheck', (req, res, next) => {
        res.json({
            response: true,
            isDuplicated: database.test(req.body.id),
        })
    })

    /**
     * 회원가입 수행
     * database.insert함수를 통해 id를 key값으로 하는 회원 정보 삽입
     */
    router.post('/join', (req, res, next) => {
        database.insert(req.body.id, req.body.userInfo)
        console.dir(database.get(req.body.id))
        res.redirect('/login')
    })

    /**
     * 로그인 수행
     * 
     */
    router.post('/login', (req, res, next) => {

        res.json({
            response: true
        })
    })

    return router
}