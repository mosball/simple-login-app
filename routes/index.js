module.exports = (express, database, sessions) => {
    const router = express.Router()

    /**
     * localhost:3000 으로 접속시 index.ejs를 rendering
     */
    router.get('/', (req, res, next) => {
        const sessionId = req.cookies['session-id']
        res.locals.userName = ''
        res.render('index')
    })

    /**
     * 아이디 중복체크를 수행
     * database.test 함수를 통해 아이디 중복 체크
     */
    router.post('/duplicateIdCheck', (req, res, next) => {
        res.json({
            response    : true,
            isDuplicated: database.test(req.body.id),
        })
    })

    /**
     * 회원가입 수행
     * database.insert 함수를 통해 id를 key값으로 하는 회원 정보 삽입
     */
    router.post('/join', (req, res, next) => {
        database.insert(req.body.id, req.body.userInfo)

        const account = database.get(req.body.id)
        console.dir(account)

        makeCookieAndSession(res, sessions, account.name)
        res.json({ response: true})
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

/**
 * 세션과 쿠키를 생성함으로써 유저를 로그인 상태로 만드는 함수
 * @param {*} res 
 * @param {*} sessions 
 * @param {*} name 유저 이름
 */
const makeCookieAndSession = (res, sessions, name) => {
    const uuid = require('uuid/v4')()
    const daysMillis = 1000 * 60 * 60 * 24 //24시간

    res.cookie('session-id', uuid, {
        maxAge  : daysMillis,
        httpOnly: true
    })

    sessions.add(uuid, name, new Date().getTime() + daysMillis)
}