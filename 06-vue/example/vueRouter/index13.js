const Foo = {
    template: `
      <transition name="slide">
        <div class="foo">
            <h1> Foo </h1>
            <router-link to="/bar"> bar </router-link>
        </div>
      </transition>
    `
}

const Bar = {
    template: `
      <transition name="fade">
        <div class="bar">
            <h1> Bar </h1>
            <router-link to="/foo"> foo </router-link>
        </div>
      </transition>
    `
}


// 生成路由
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo
        },
        {
            path: '/bar',
            component: Bar
        }
    ]
})

new Vue({
    el: "#app",
    router
})