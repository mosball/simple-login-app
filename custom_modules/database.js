module.exports = class {
    constructor() {
        this.database = {
            'rnjsrldnd123':{
                name: '권기웅'
            }
        }
    }

    /**
     * database객체에 데이터를 삽입하는 함수
     * 
     * @param {string} key user id
     * @param {object} value user info
     */
    insert(key, value) {
        if (this.database[key]) {
            console.log('이미 존재하는 아이디입니다.')
        } else {
            this.database[key] = value
        }
    }

    /**
     * database에 해당 key를 가진 객체가 있는지 확인하는 함수
     * @param {string} key user id
     * @param {boolean}
     */
    test(key) {
        return this.database[key] ? true : false
    }

    /**
     * database에서 해당 key를 가진 object를 반환
     * @param {string} key user id
     * @return {object} user info
     */
    get(key) {
        return this.database[key]
    }
}