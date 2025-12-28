import { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List';
import './App.css'

export default class App extends Component {
  state = {
    todos: []
  }
  // 增加todo
  addTodo(todo) {
    const { todos } = this.state;
    console.log('addTodo', todos, todo);

    todos.unshift(todo)
    this.setState({ todos: todos })
  }
  // 删除todo
  deleteTodo(index) {
    const { todos } = this.state;
    todos.splice(index, 1)
    this.setState({ todos: todos })
  }
  // 全选/全不选todos
  checkAllTodos(isCheck) {
    const { todos } = this.state;
    console.log('checkAllTodos', todos, isCheck);

    todos.forEach((todo) => (todo.complete = isCheck))
    this.setState({ todos: [...todos] })
  }
  // 清除已完成的todo
  clearCompleteTodos() {
    const { todos } = this.state;
    console.log("clearCompleteTodos", todos);

    // 使用filter过滤出服务条件的新数组
    // 因为filter不会改变原数组，故将产生的新数组重新传递给原数组
    const notCompleteTodos = todos.filter((todo) => !todo.complete)
    this.setState({ todos: notCompleteTodos })
  }
  // 更新勾选状态
  updateTodo(todo, isCheck) {
    console.log("App updateTodo", todo, isCheck);
    const { todos } = this.state;
    const findTodo = todos.find(i => i.id == todo.id);
    findTodo.complete = isCheck;
    this.setState({ todos: todos })
  }
  render() {
    const { todos = [] } = this.state;

    console.log('App', todos);

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={(e) => this.addTodo(e)}></Header>
          <List
            todos={todos}
            deleteTodo={(e) => this.deleteTodo(e)}
            updateTodo={(todo, isCheck) => this.updateTodo(todo, isCheck)}></List>
          <Footer todos={todos}
            checkAllTodos={(e) => this.checkAllTodos(e)}
            clearCompleteTodos={() => this.clearCompleteTodos()}></Footer >
        </div >
      </div>
    )
  }
}
