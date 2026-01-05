import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//   BrowserRouter 必须从react-router-dom依赖获取,而不是react-router!!!
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
