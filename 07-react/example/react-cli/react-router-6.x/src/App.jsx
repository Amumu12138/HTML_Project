import { useState } from 'react'
//  Routes, useRoutes 必须从react-router-dom依赖获取,而不是react-router
import { NavLink, Routes, useNavigate, useRoutes } from 'react-router-dom'
import routes from './router'
import './App.css'

function App() {
  console.log(routes, 'routes');

  const [count, setCount] = useState(0)
  const element = useRoutes(routes)
  const navigate = useNavigate();
  function toHome() {
    console.log('toHome navigate', navigate);
    navigate('/home', { replace: false })
  }
  return (
    <div>
      count is {count}
      <br />
      <button onClick={() => setCount(count + 1)}>Add</button>
      <br />
      <button style={{ marginTop: '10px' }} onClick={() => toHome()}>前往Home</button>
      <hr />
      {/* NativeLink高亮样式类修改为函数形式 className={isActive => isActive ? 'xxx' : ''} */}
      <NavLink className={isActive => isActive ? 'light' : ''} to='/about'>about</NavLink>
      {/* 注册路由 */}
      {element}
    </div>
  )
}

export default App
