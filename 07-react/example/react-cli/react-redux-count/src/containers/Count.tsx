import { Component } from 'react'

// 用于连接UI组件与redux
import { connect } from 'react-redux'
import { incrementAction, incrementAsyncAction, decrementAction } from '../redux/action'

// 整合UI组件和容器组件
class Count extends Component {

    selectRef = null
    increment() {
        const { value } = this.selectRef
        this.props.add(value)
    }

    decrement() {
        const { value } = this.selectRef
        this.props.reduce(value)
    }

    incrementIfOdd() {
        const { value } = this.selectRef
        if (this.props.count % 2 !== 0) {
            this.props.add(value)
        }
    }
    incrementAsync() {
        const { value } = this.selectRef
        this.props.addAsync(value, 1000)
    }

    render() {
        console.log('props', this.props);

        return (
            <div>
                <h1>当前求和: {this.props.count}</h1>
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

/**
 * mapStateToProps()
 * 1. 用于传递状态
 * 2. 返回一个对象
 * 3. react-redux在调用该函数时已经传入了state
 * 4. 此处的值传入UI组件中，UI组件可使用this.props.xxx拿到对应的值
 */
const mapStateToProps = (state) => {
    return {
        count: state
    }
}

/**
 * mapDispatchToProps()
 * 1. 用于传递操作状态的方法
 * 2. 返回一个对象，对象的value是一个方法
 */
const mapDispatchToProps = (dispatch) => {
    return {
        add: num => {
            dispatch(incrementAction(num))
        },
        addAsync: (num, delay) => {
            dispatch(incrementAsyncAction(num, delay))
        },
        reduce: (num) => {
            dispatch(decrementAction(num))
        }
    }
}
// 可简写为：
/* const mapDispatchToProps = {
  add: incrementAction,
  addAsync: incrementAsyncAction,
  reduce: decrementAction
} */

// 定义容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Count)
