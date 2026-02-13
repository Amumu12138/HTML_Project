import React, { Component } from 'react'
import Item from '../Item';
import './index.css';

export default class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { todos = [], deleteTodo, updateTodo } = this.props;
        console.log('List', todos, deleteTodo, updateTodo);

        return (
            <ul className="todo-main">
                {
                    todos.map((item, index) => {
                        return <Item key={item.id} index={index} todo={item} deleteTodo={(index) => deleteTodo(index)} updateTodo={(todo, isCheck) => updateTodo(todo, isCheck)} ></Item>
                    })
                }
            </ul >
        )
    }
}
