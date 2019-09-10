module.exports = class {
    /**
     * 데이터베이스 객체 초기화
     */
    constructor() {
        this.fs = require('fs')
        this.database = this.getSavedData()
    }

    /**
     * userData파일에서 데이터를 가져온 후 database객체 초기화
     */
    getSavedData() {
        const data = this.fs.readFileSync(`${__dirname}/userData`, 'UTF-8')
        return data ? JSON.parse(data) : {}
    }

    /**
     * database객체에 데이터를 삽입
     * @param {string} key user id
     * @param {object} value user info
     */
    insert(key, value) {
        this.database[key] = value
        this.save()
    }

    /**
     * database에 해당 key를 가진 객체가 있는지 확인
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

    /**
     * database에 저장되있는 모든 데이터를 출력
     */
    print() {
        for (let id in this.database) {
            console.log(`id : ${id}`)
            console.log(`info : ${JSON.stringify(this.database[id])}`)
        }
    }

    /**
     * database에 저장되있는 모든 데이터를 파일에 저장
     */
    save() {
        const jsonString = JSON.stringify(this.database)
        this.fs.writeFile(`${__dirname}/userData`, jsonString, 'UTF-8', () => {
            console.log('data save completed')
        })
    }
}