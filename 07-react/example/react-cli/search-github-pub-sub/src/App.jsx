import React, { Component } from 'react'

import Search from './components/Search'
import List from './components/List'

export default class App extends Component {

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

