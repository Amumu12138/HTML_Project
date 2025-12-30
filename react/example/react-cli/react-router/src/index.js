import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, HashRouter, Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <HashRouter> url会加上#*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* </HashRouter> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
)