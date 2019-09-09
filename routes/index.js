const crypto = require('crypto')

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

/**
 * 단방향 암호화 함수
 * @param {string} plainString 
 */
const encrypt = (plainString) => {
    const SECRET = 'HWkm(*WD-i12d7y'

    return crypto.createHmac('sha512', SECRET)
    .update(plainString)
    .digest('base64')
}

module.exports = (express, database, sessions) => {
    const router = express.Router()

    /**
     * localhost:3000 으로 접속시 index.ejs를 rendering
     */
    router.get('/', (req, res, next) => {
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
        req.body.userInfo.password = encrypt(req.body.userInfo.password)
        database.insert(req.body.id, req.body.userInfo)

        const account = database.get(req.body.id)

        makeCookieAndSession(res, sessions, account.name)
        res.json({ response: true})
    })

    /**
     * 로그인 수행
     * database.get을 통해 회원 정보를 가져오고 회원의 password와 넘어온 password가 일치하는지 확인
     * 일치한다면 세션 및 쿠키 생성
     */
    router.post('/login', (req, res, next) => {
        const account  = database.get(req.body.id)
        const isMember = account ? account.password === encrypt(req.body.password) : false

        if (isMember) {
            makeCookieAndSession(res, sessions, account.name)
        }

        res.json({
            response: isMember
        })
    })

    /**
     * 로그아웃 수행
     * 쿠키와 세션 정보 모두 삭제
     */
    router.post('/logout', (req, res, next) => {
        //쿠키, 세션 삭제
        const sessionId = req.cookies['session-id']
        sessions.remove(sessionId)
        res.clearCookie('session-id')

        res.json({
            response: true
        })
    })

    return router
}