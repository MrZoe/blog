const { MongoClient } = require('mongodb')

const mongoUrl = () => {
    const url = 'mongodb://localhost:27017/blog'
    return url
}

// console.log(MongoClient)
const insertDocuments = (data, callback) => {
    // 首先打开数据库
    const url = mongoUrl()
    MongoClient.connect(url, (error, db) =>  {
        console.log('数据库已打开')
        // 打开表
        const collection = db.collection('articel')
        collection.insertOne(data, (error, result) => {
            if ( error !== null ) {
                console.log(error)
            }
            console.log('插入了一条数据')
            db.close()
        })
    })
}

const findAllDocuments = (call) => {
    // 首先打开数据库
    const url = mongoUrl()
    MongoClient.connect(url, (error, db) =>  {
        console.log('数据库已打开')
        // 打开表
        const collection = db.collection('articel')
        collection.find({}).toArray((error, result) => {
            if (error !== null) {
                console.log(error)
            }
            console.log(result)
            call(result)
        })
    })
}

const findArticle = (id, call) => {
    // 首先打开数据库
    const url = mongoUrl()
    console.log(id)
    MongoClient.connect(url, (error, db) =>  {
        console.log('数据库已打开')
        // 打开表
        const collection = db.collection('articel')

        collection.find({}).toArray((error, result) => {
            if (error !== null) {
                console.log(error)
            }
            result = result.filter(item => String(item._id) === id)[0]
            call(result)
        })
    })
}


const findArticleByTags = (call, tag) => {
    // 首先打开数据库
    const url = mongoUrl()
    MongoClient.connect(url, (error, db) =>  {
        console.log('数据库已打开')
        // 打开表
        const collection = db.collection('articel')
        collection.find({"tags": tag}).toArray((error, result) => {
            if (error !== null) {
                console.log(error)
            }
            console.log(result)
            call(result)
        })
    })
}

const getArticle = (id, cal) => {
    console.log(' 准备调用 findArticle ')

    findArticle(id, (r) => {
        cal(r)
    })
}
const insertArticel = data => insertDocuments(data)
const getAll = cal => {
    findAllDocuments(r => {
        cal(r)
    })
}

const getArticleByTags = (cal, tag) => {
    console.log('get article by tags', )
    findArticleByTags(r => {
        cal(r)
    }, tag)
}

// 暴露出去的方法接受 data 参数和 回调函数
module.exports = {
    insertArticel: insertArticel,
    getAll: getAll,
    getArticle: getArticle,
    getArticleByTags: getArticleByTags,
}
