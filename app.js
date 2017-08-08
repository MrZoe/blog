const express = require('express')
const bodyParser = require('body-parser')

// 初始化 express 实例
const app = express()

// 设置 bodyParser
app.use(bodyParser.urlencoded({
    extended: false,
}))

app.use(bodyParser.json())

// // 配置静态资源文件
// const asset = __dirname + '/static'
// app.use(express.static(asset))

app.use('/static', express.static('./static'))

const index = require('./routes/index')
const add = require('./routes/add')
const detail = require('./routes/detail')
const tag = require('./routes/tag')

app.use('/', index)
app.use('/add', add)
app.use('/detail', detail)
app.use('/tag', tag)

const run = (port=5000, host='0.0.0.0') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        host = address.address
        port = address.port
        console.log(`listening server at http://${host}:${port}`)
    })
}

if (require.main === module) {
    run()
}
