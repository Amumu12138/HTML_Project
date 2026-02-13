/**
 * 该文件用于创建一个为Count组件服务的reducer，reducer本质是一个函数
 * 
 * reducer函数接收两个参数：之前的状态(preState)、动作对象(action)
 *                        第一次被调用时，preState为undefined
 */

import { DECREMENT, INCREMENT } from "../constants/count";

const initState = 0
export default function countReducer(preState: number = initState, action: Record<string, any>) {
    console.log(preState, action); // 初始化preState: 0 初始化action: type: "@@redux/INIT0.o.r.w.0.q"

    const { type, data } = action

    switch (type) {
        case INCREMENT:
            return preState + data * 1
        case DECREMENT:
            return preState - data * 1
        default:
            return preState
    }
}
