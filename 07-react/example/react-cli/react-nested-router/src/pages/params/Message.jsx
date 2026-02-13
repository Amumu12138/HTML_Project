import { Outlet, Link } from 'react-router-dom'

export default function Message() {
  return (
    <div>
      <ul>
        <Link to="/home/message/detail/01">message01</Link>
        <br />
        <Link to="/home/message/detail/02">message02</Link>
        <br />
        <Link to="/home/message/detail/03">message03</Link>
      </ul>
      {/* 指定路由展示的位置 */}
      <Outlet />
    </div>
  )
}
