import React, { Component } from 'react'
import { nanoid } from 'nanoid';
import './index.css'

export default class Header extends Component {
    state = {
        title: ''
    }

    constructor(props) {
        super(props);
    }

    handleChange(event) {
        this.inputRef.current.value = event.target.value;
    }
    // 添加数据的函数
    add(event) {
        console.log('e', event);
        const title = this.inputRef.current.value.trim();
        if (event.keyCode !== 13) {
            return;
        }

        if (title === '') {
            alert("输入不能为空")
            return
        }

        const { addTodo } = this.props;

        console.log(addTodo);
        // 1.根据输入创建一个todo

        const todo = {
            // id: Date.now(),
            id: nanoid(),
            complete: false,
            title: title,
        }
        // 2.添加todo
        addTodo(todo);

        // 3.清除输入
        this.inputRef.current.value = '';
    }
    inputRef = React.createRef()
    render() {
        return (
            <div className="todo-header">
                <input
                    type="text"
                    placeholder="请输入你的任务名称，按回车键确认"
                    onKeyUp={(e) => this.add(e)}
                    ref={this.inputRef}
                    onChange={(e) => this.handleChange(e)}
                />
            </div>
        )
    }
}
