import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

    constructor(props) {
        super(props);
    }

    confirmClearCompleteTodos() {
        const { clearCompleteTodos } = this.props;

        if (window.confirm('你确定删除已完成任务吗？')) {
            clearCompleteTodos()
        }
    }

    handleChange(event) {
        const { checkAllTodos } = this.props;
        console.log('handleChange', event, checkAllTodos);
        checkAllTodos(event.target.checked);
    }

    // 从props属性获取衍生状态触发,且必须是静态方法修饰
    // static getDerivedStateFromProps(prevState, prevProps) {
    //     console.log('getDerivedStateFromProps', prevState, prevProps);

    //     return null;
    // }

    // 在组件更新前获取快照
    // getSnapshotBeforeUpdate(_, __, snapshotValue) {
    //     console.log('getSnapshotBeforeUpdate', snapshotValue);

    // }

    // 组件已挂载时触发
    // componentDidUpdate() {
    //     console.log('componentDidUpdate called');

    // }
    inputRef = React.createRef();
    render() {
        console.log('Footer props', this.props);

        const { todos = [] } = this.props;
        const todoLen = todos.length;
        const completeSize = todos.reduce(
            (pre, todo) => pre + (todo.complete ? 1 : 0),
            0);
        return (
            <div className="todo-footer">
                <label>
                    <input ref={this.inputRef} type="checkbox" checked={todoLen > 0 && completeSize === todoLen} onChange={(e) => this.handleChange(e)} />
                </label>
                <span>
                    <span>已完成 {completeSize} </span> / 全部 {todoLen}
                </span>
                <button
                    style={{ display: completeSize > 0 ? 'block' : 'none' }}
                    className="btn btn-danger"
                    onClick={() => this.confirmClearCompleteTodos()}
                >
                    清除已完成任务
                </button>
            </div >
        )
    }
}
