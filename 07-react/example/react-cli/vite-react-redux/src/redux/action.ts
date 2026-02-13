import { INCREMENT, DECREMENT } from '../constants/count.ts'

// 同步action,指的是值为object的一般对象
export const incrementAction = (data: number) => {
    return { type: INCREMENT, data }
}

export const decrementAction = (data: number) => {
    return { type: DECREMENT, data }
}

// 异步action,指的是action值为函数, 异步action中一般都会调用同步action
export const incrementAsyncAction = (data: number, time: number) => {
    return (dispatch: Function) => {
        setTimeout(() => {
            dispatch(incrementAction(data))
        }, time)
    }
}