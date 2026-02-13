import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function Home() {
    // 编程路由导航
    const naviagte = useNavigate()

    const toMessage = () => {
        naviagte('message', { replace: false })
    }
    return (
        <div>
            Home
            <br />
            <NavLink to="message" >前往message</NavLink>
            <br />
            <button style={{ marginTop: '10px' }} onClick={() => toMessage()}>navigate跳转message</button>
            <hr />
            {/* 指定路由组件呈现的位置 */}
            <Outlet></Outlet>
        </div>
    )
}
