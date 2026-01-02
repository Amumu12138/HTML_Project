import { ADD_PERSON } from "../../contants";

const initState = () => {
    return [{
        id: '001',
        name: '',
        age: 18
    }]
}
// Person数据操作者
export default function personReducer(preState: Array<any> = initState(), action: Record<string, any>) {
    const { type, data } = action

    switch (type) {
        case ADD_PERSON:
            return [data, ...preState]
        default:
            return preState
    }
}