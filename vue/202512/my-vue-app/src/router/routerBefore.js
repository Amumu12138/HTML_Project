import router from './index';
import { useAllDataStore } from "@/store";

function isRoute(to) {
    const res = router.getRoutes();
    const resFil = res.filter(item => item.path === to.path);
    return resFil.length > 0;
}

router.beforeEach((to) => {
    const store = useAllDataStore();
    if (to.path !== "/login" && !store.state.token) {
        return { name: "login" };
    }
    if (!isRoute(to)) {
        return { name: "404" };
    }
});