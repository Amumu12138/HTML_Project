import { Component } from 'react'
import store from '../redux/store.ts'
import { decrementAction, incrementAction, incrementAsyncAction } from '../redux/action.ts'


export default class Count extends Component {

    selectRef = null
    increment() {
        const { value } = this.selectRef
        store.dispatch(incrementAction(value))
        // this.setState({ count: count + Number(value) })
    }

    decrement() {
        const { value } = this.selectRef
        store.dispatch(decrementAction(value))
        // this.setState({ count: count - Number(value) })
    }

    incrementIfOdd() {
        const { value } = this.selectRef
        if (store.getState() % 2 !== 0) {
            store.dispatch(incrementAction(value))
            // this.setState({ count: count + Number(value) })
        }
    }
    incrementAsync() {
        const { value } = this.selectRef
        // setTimeout(() => {
        //     store.dispatch(incrementAction(value))
        //     // this.setState({ count: count + Number(value) })
        // }, 1000)
        // 异步action执行
        store.dispatch(incrementAsyncAction(value, 1000))
    }

    render() {
        return (
            <div>
                <h1>当前求和: {store.getState()}</h1>
                <select ref={c => this.selectRef = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={() => this.increment()}>add</button>
                <button onClick={() => this.decrement()}>decrement</button>
                <button onClick={() => this.incrementIfOdd()}>increment odd</button>
                <button onClick={() => this.incrementAsync()}>async add</button>
            </div>
        )
    }
}
