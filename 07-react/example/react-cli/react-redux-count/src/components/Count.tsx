import { Component } from 'react'

export default class Count extends Component {

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
