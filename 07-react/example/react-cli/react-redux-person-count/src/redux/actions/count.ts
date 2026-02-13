import { DECREMENT, INCREMENT } from "../../contants"

export const incrementAction = (data: number) => {
    return { type: INCREMENT, data }
}

export const decrementAction = (data: number) => {
    return { type: DECREMENT, data }
}