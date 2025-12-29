import React, { Component } from 'react'

import Search from './components/Search'
import List from './components/List'

export default class App extends Component {
  state = {
    // 用户列表
    user: [],
    // 是否是第一次查询
    isFirst: true,
    // 是否开启loading
    isLoading: false,
    // 报错
    error: ''
  }

  // 更新状态
  updateState = (obj) => {
    this.setState(obj)
  }
  render() {
    return (
      <div className="container" style={{ 'marginTop': '20px' }}>
        <section className="jumbotron">
          <h3 className="jumbotron-heading">搜索github用户</h3>
          {/* search组件 */}
          <Search />
        </section>
        {/* list组件 */}
        <List />
      </div>
    )
  }
}

