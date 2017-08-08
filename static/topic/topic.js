const vm = new Vue({
    el: '#app',
    data: {
        articleList : [],
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getArticleList()
        })
    },
    methods: {
        getArticleList: function () {
            let url = '/tag'
            let tag = location.search.split('=')[1]
            console.log(tag)
            let data = {
                search: tag,
            }
            axios.post(url, data).then(function(response) {
                response.data.forEach((item) => {
                    item._id = '/detail/' + item._id
                })
                vm.articleList = response.data.reverse()
            })
        }
    }
})
