import { defineStore } from "pinia";
import { ref, watch } from "vue";
function initState() {
    return {
        isCollapse: false,
        tags: [
            {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "home",
            },
        ],
        currentMenu: null,
        menuList: [],
        token: "",
        routerList: [],
    };
}

export const useAllDataStore = defineStore("allData", () => {
    const state = ref(initState());

    watch(
        state,
        (newObj) => {
            if (!newObj.token) return;
            localStorage.setItem("store", JSON.stringify(newObj));
        },
        { deep: true }
    );

    function selectMenu(val) {
        if (val.name === "home") {
            state.value.currentMenu = null;
        } else {
            state.value.currentMenu = val;
            const index = state.value.tags.findIndex((item) => item.name === val.name);
            index === -1 ? state.value.tags.push(val) : "";
        }
    }
    function undateTags(tag) {
        const index = state.value.tags.findIndex((item) => item.name === tag.name);
        state.value.tags.splice(index, 1);
    }
    function updateMenuList(val) {
        state.value.menuList = val;
    }
    function addMenu(router, type) {
        if (type === "refresh") {
            const cached = JSON.parse(localStorage.getItem("store"));
            if (!cached) {
                return;
            }

            state.value = cached;
            state.value.routerList = [];
        }
        const menu = state.value.menuList;
        const module = import.meta.glob("../views/**/*.vue");
        console.log('module', module);
        // 定义菜单格式化后的路由数组
        const routeArr = [];
        // 格式化菜单路由
        menu.forEach((item) => {
            // 菜单有children
            if (item.children) {
                item.children.forEach((val) => {
                    const url = `../views/${val.url}.vue`;
                    val.component = module[url];
                });
                routeArr.push(...item.children);
            } else {
                const url = `../views/${item.url}.vue`;
                item.component = module[url];
                routeArr.push(item);
            }
        });
        state.value.routerList = [];
        const routers = router.getRoutes();
        // 解决多账号路由问题，每次添加路由前先删除所有路由
        routers.forEach((item) => {
            if (item.name == "main" || item.name == "login" || item.name == "404") {
                return;
            } else {
                router.removeRoute(item.name);
            }
        });
        routeArr.forEach((item) => {
            state.value.routerList.push(router.addRoute("main", item));
        });
    }
    function clean() {
        state.value.routerList.forEach((item) => {
            // console.log(item); // () => { removeRoute(originalMatcher); }
            if (item) item();
        });
        state.value = initState();
        // 删除我们本地的缓存
        localStorage.removeItem("store");
    }
    return {
        state,
        selectMenu,
        undateTags,
        updateMenuList,
        addMenu,
        clean,
    };
});
