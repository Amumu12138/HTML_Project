import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
    state = {
        bgColor: 'white',
        isShow: false,
    }

    constructor(props) {
        super(props);
    }

    handleEnter(isEnter) {
        if (isEnter) {
            this.setState({ bgColor: 'skyblue', isShow: true })
            // 进入
            // (this.bgColor = '#aaaaaa'), (this.isShow = true)
        } else {
            // 移出
            // (this.bgColor = '#ffffff'), (this.isShow = false)
            this.setState({ bgColor: '#ffffff', isShow: false })
        }
    }
    confirmDelete(index) {
        const { deleteTodo } = this.props;
        if (window.confirm('你确定删除吗？')) {
            deleteTodo(index)
        }
    }


    inputRef = React.createRef()
    render() {
        const { todo = { title: '' }, index, updateTodo } = this.props;
        const { bgColor, isShow } = this.state;
        console.log('Item', bgColor, todo);

        return (
            <li style={{ backgroundColor: bgColor }}
                onMouseEnter={() => this.handleEnter(true)}
                onMouseLeave={() => this.handleEnter(false)}
            >
                <label>
                    <input ref={this.inputRef} type="checkbox" checked={todo.complete} onChange={(e) => updateTodo(todo, e.target.checked)} />
                    <span> {todo.title} </span>
                </label>
                <button style={{ display: isShow ? 'block' : 'none' }} className="btn btn-danger" onClick={() => this.confirmDelete(index)} >
                    删除
                </button >
            </li>
        )
    }
}
