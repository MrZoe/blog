const express = require('express')
const tags = express.Router()
const { getArticleByTags } = require('../models/main.js')

//

tags.get('/', (request, response) => {
    // 前端
    // 当 get 这个页面时, 发送回一个页面
    // const tag = '前端'
    response.sendfile('static/topic/tag.html')
    // getArticleByTags((r) => {
    //     response.json(r)
    // }, tag)
})

tags.post('/', (request, response) => {
    // 前端
    // 当 post 这个页面时, 发送回一个文章数组
    let tag = null
    const search = request.body.search
    console.log(search)
    if (search === 'fe') {
        tag = '前端'
    } else if (search === 'be') {
        tag = '后端'
    } else if (search === 'life') {
        tag = '生活'
    } else if (search === 'note') {
        tag = '笔记'
    }
    getArticleByTags((r) => {
        response.json(r)
    }, tag)
})

module.exports = tags
