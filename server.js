const app = require('./app')
const server = app.listen(process.env.PORT || 3000, '0.0.0.0')

const onError = (error) => {
    console.log(`# 에러 발생
    # 시간 : ${new Date()}
    # 내용 : ${error}`)
}

const onListening = () => {
    console.log(`3000 port server listening!! ${new Date()}`)
}

server.on('error', onError)
server.on('listening', onListening)