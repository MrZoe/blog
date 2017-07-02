const vm = new Vue({
    el: '#app',
    data: {
        date: null,
        title: null,
        content: null,
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getArticle()
            vm.hl()
        })
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.content, { sanitize: true })
        }
    },
    methods: {
        getArticle: function () {
            let url = location.pathname
            let data = {
                id: location.pathname.split('/')[2],
            }
            axios.post(url, data).then(function(response) {
                const res = response.data
                // console.log(res)
                vm.date = res.ct
                vm.title = res.title
                vm.content = res.content
            })
        },
        hl: function () {
            marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
            return hljs.highlightAuto(code).value;
          }
        });
        }
    }
})

// marked.setOptions({
//   highlight: (code) => hljs.highlightAuto(code).value
// })
// let highlight_code = marked(code)
