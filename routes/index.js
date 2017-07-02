const express = require('express')
const index = express.Router()
const { getAll } = require('../models/main.js')
index.get('/', (request, response) => {
    response.sendfile('static/index/index.html')
})

index.get('/blog', (request, response) => {
    response.sendfile('static/blog/blog.html')
})

index.get('/all', (request, response) => {
    getAll((r) => {
        response.json(r)
        console.log('已返回所有文章')
    })
})

module.exports = index
