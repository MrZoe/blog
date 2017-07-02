const express = require('express')
const add = express.Router()
const { insertArticel } = require('../models/main.js')

add.get('/', (request, response) => {
    if (request.query.admin === 'zelda') {
        response.sendfile('static/add/add.html')
    } else {
        response.json('无权访问')
    }
})

add.post('/', (request, response) => {
    // 发表新文章时, 调用一个保存到 mongo 数据库中的函数, 如果保存成功返回 true, 这里就给客户端返回 true
    const body = request.body
    // 添加文章
    insertArticel(body)
    let res = {
        code: 200,
        msg: '发表成功',
    }
    response.json(res)
})

module.exports = add
