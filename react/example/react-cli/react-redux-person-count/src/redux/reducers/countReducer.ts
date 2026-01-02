import { DECREMENT, INCREMENT } from "../../contants";

const initState = 0
// Count数据操作者
export default function countReducer(preState: number = initState, action: Record<string, any>) {
    const { type, data } = action

    switch (type) {
        case INCREMENT:
            return preState + data;
        case DECREMENT:
            return preState - data;
        default:
            return preState
    }
}