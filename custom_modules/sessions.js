module.exports = class {
    /**
     * 세션 객체 초기화
     * 세션 만료시 삭제할 예약 작업 등록
     * 
     * 데이터 예상 구조
     * sessions {
     *     session-id: {
     *         name  : '',
     *         expire: '2019-09-06'
     *     }
     * }
     */
    constructor() {
        this.sessions = {}
        this.registerExpireJob()
    }

    /**
     * 세션 객체 추가
     * @param {uuid string} sessionId 
     * @param {string} name 
     * @param {milliseconds} expire 
     */
    add(sessionId, name, expire) {
        this.sessions[sessionId] = {
            name  : name,
            expire: expire
        }
    }

    /**
     * 특정 세션 객체 삭제
     * @param {uuid string} sessionId 
     */
    remove(sessionId) {
        delete this.sessions[sessionId]
    }

    /**
     * 10분마다 expire가 지난 세션 객체를 체크하여 삭제
     */
    registerExpireJob() {
        setInterval(() => {
            const now = new Date()
            const sessionsToExpire = []

            for (let sessionId in Object.keys(this.sessions)) {
                const session    = this.sessions[sessionId]
                const expireDate = new Date()

                expireDate.setTime(session.expire)
                if (now.getTime() >= expireDate.getTime()) {
                    sessionsToExpire.push(sessionId)
                }
            }

            sessionsToExpire.forEach(sessionId => {
                delete this.sessions[sessionId]
            })
        }, 1000 * 60 * 10 /* 10분 */)
    }
}