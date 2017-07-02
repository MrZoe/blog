const express = require('express')
const detail = express.Router()
const { getArticle } = require('../models/main.js')

detail.get('/:id', (request, response) => {
    response.sendfile('static/detail/detail.html')
})

detail.post('/:id', (request, response) => {
    const id = request.body.id
    console.log(id)
    getArticle(id, (r) => {
        response.send(r)
    })



})

module.exports = detail
