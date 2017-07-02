const vm = new Vue({
    el: '#app',
    data: {
        input: '### 1. 三级标题',
        title: '请输入标题',
        tags: ['生活', '前端', '后端', '笔记'],
        postText: '提交新文章',
        postCondition: false,
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.input, { sanitize: true })
        }
    },
    methods: {
        update: function (e) {
            this.input = e.target.value
        },
        updateTags: function (e) {
            // console.log(typeof e.target.value, e.target.value)
            let ary = e.target.value.split(',')
            console.log(ary)
            this.tags = ary
        },
        updateTitle: function (e) {
            this.title = e.target.value
        },
        post: function () {
            const _this = this
            let data = {
                title: this.title,
                tags: this.tags,
                content: this.input,
                ct: this.getDate()
            }
            // console.log(data)
            let url = '/add'
            axios.post(url, data).then(function(response) {
                console.log(this)
                _this.postText = response.data.msg
                _this.postCondition = true
                setTimeout(function () {
                    location.href = '/blog'
                    // console.log('重定向')
                }, 2000)
            })
        },
        getDate: function () {
            let date = new Date()
            let year = String(date.getFullYear())
            let month = this.formatDate(date.getMonth() + 1)
            let day = this.formatDate(date.getDate())
            return `${year} / ${month} / ${day}`
        },
        formatDate: function (date) {
            return date < 10 ? '0' + String(date) : String(date)
        }
    }
})
