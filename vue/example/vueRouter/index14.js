getPost = function (id, callback) {
    const err = null
    let postInfo = {
        id: id,
        title: '这是title',
        body: '这是body'
    }

    setTimeout(function () {
        if (callback) callback(err, postInfo)
    }, 1000)
}


const Home = {
    template: `
    <div>
        <h1> Home </h1>
        <router-link to="/post/12"> 第十二课 </router-link>
        <router-link to="/post/13"> 第十三课 </router-link>
    </div>
    `
}

const Post = {
    template: `
    <div class="post">
        <div v-if="loading" class="loading">
        Loading...
        </div>

        <div v-if="error" class="error">
        {{ error }}
        </div>

        <div v-if="post" class="content">
        <h1>{{ num }}</h1>
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        </div>
    </div>
    `,
    data() {
        return {
            loading: false,
            error: null,
            post: null
        }
    },
    computed: {
        num() {
            if (this.post) {
                return `第${this.post.id}课`
            }
        }
    },
    created() {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.fetchData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'fetchData'
    },
    beforeRouteEnter(to, from, next) {
        // getPost(to.params.id, (err, post) => {
        //     next(vm => vm.setData(err, post))
        // })
        next()
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate(to, from, next) {
        this.post = null
        // getPost(to.params.id, (err, post) => {
        //     this.setData(err, post)
        //     next()
        // })
        next()
    },
    methods: {
        fetchData() {
            this.error = this.post = null
            this.loading = true
            // replace getPost with your data fetching util / API wrapper
            getPost(this.$route.params.id, (err, post) => {
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.post = post
                }
            })
        },
        setData(err, post) {
            if (err) {
                this.error = err.toString()
            } else {
                this.post = post
            }
        }
    }
}


const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/post/:id',
            component: Post
        }
    ]
})

new Vue({
    el: "#app",
    router
})