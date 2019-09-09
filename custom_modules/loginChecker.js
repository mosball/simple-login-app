/**
 * 접속한 클라이언트가 로그인된 유저인지 체크 하는 미들웨어
 * 로그인된 유저라면 res.locals.userName에 유저의 이름을 저장
 */
module.exports = (sessions) => {
    return (req, res, next) => {
        const sessionId = req.cookies['session-id'] || ''
        const session   = sessions.get(sessionId)
        
        res.locals.userName = session ? session.name : ''
        next()
    }
}