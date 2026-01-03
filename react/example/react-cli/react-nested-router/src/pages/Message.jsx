import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Message() {
  return (
    <div>
      <ul>
        <Link to="/home/message/detail/01">params参数</Link>
        <br />
        <Link to="/home/message/search">search参数</Link>
        <br />
        <Link to="/home/message/state">state参数</Link>
      </ul>
      {/* 指定路由展示的位置 */}
      <Outlet />
    </div>
  )
}
