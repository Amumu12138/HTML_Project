import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from './redux/store.ts'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// 监测store的改变，改变时渲染页面
// 因为redux只负责管理状态，不进行页面的渲染
store.subscribe(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})