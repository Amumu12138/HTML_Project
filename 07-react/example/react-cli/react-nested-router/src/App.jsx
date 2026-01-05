import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './router'

export default function App() {
  const element = useRoutes(routes)

  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            <h2>React Router Demo</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* 路由链接 react-router-dom 6+版本 activeClassName 修改为className函数传入isActive参数形式*/}
            <NavLink
              className={({ isActive }) => isActive ? "selected list-group-item" : "list-group-item"}
              to="/about">
              About
            </NavLink>
            <NavLink className="list-group-item" to="/home">Home</NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 注册路由 */}
              {element}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
