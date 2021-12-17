import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";
import Computed from "@/views/Computed";
import Watch from "@/views/Watch";
import WatchEffect from "@/views/WatchEffect";
import LifeCycle from '@/views/LifeCycle';
import HookTest from '@/views/HookTest';
import ToRef from '@/views/ToRef';
import Shallow from '@/views/ShallowReactiveAndShallowRef';
import Readonly from '@/views/ReadonlyAndShallowReadonly';
import Raw from '@/views/ToRawAndMarkRaw';

const routerHistory = createWebHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/computed',
            name: 'computed',
            component: Computed
        },
        {
            path: '/watch',
            name: 'watch',
            component: Watch
        },
        {
            path: '/watch-effect',
            name: 'watch-effect',
            component: WatchEffect
        },
        {
            path: '/life-cycle',
            name: 'life-cycle',
            component: LifeCycle
        },
        {
            path: '/hook-test',
            name: 'hook-test',
            component: HookTest
        },
        {
            path: '/to-ref',
            name: 'to-ref',
            component: ToRef
        },
        {
            path: '/shallow',
            name: 'shallow',
            component: Shallow
        },
        {
            path: '/readonly',
            name: 'readonly',
            component: Readonly
        },
        {
            path: '/raw',
            name: 'raw',
            component: Raw
        }
    ]
})

export default router;