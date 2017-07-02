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
            let url = 'all'
            axios.get(url).then(function(response) {
                response.data.forEach((item) => {
                    item._id = '/detail/' + item._id
                })
                vm.articleList = response.data.reverse()
            })
        }
    }
})
